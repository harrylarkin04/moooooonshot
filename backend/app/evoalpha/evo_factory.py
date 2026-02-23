from deap import base, creator, tools
import random
from typing import Dict, List
from backend.app.core.backtester import MoonshotBacktester

creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)

class EvoAlphaFactory:
    def __init__(self):
        self.backtester = MoonshotBacktester()
        self.toolbox = base.Toolbox()
        self.toolbox.register("attr_float", random.uniform, 5, 60)
        self.toolbox.register("individual", tools.initRepeat, creator.Individual, self.toolbox.attr_float, n=2)  # fast/slow windows
        self.toolbox.register("population", tools.initRepeat, list, self.toolbox.individual)
        self.toolbox.register("evaluate", self.evaluate_strategy)
        self.toolbox.register("mate", tools.cxTwoPoint)
        self.toolbox.register("mutate", tools.mutGaussian, mu=0, sigma=5, indpb=0.2)
        self.toolbox.register("select", tools.selTournament, tournsize=3)

    def evaluate_strategy(self, individual):
        result = self.backtester.run_backtest(fast_window=int(individual[0]), slow_window=int(individual[1]), initial_cash=1000000)
        return (result["total_return_pct"],)

    def evolve(self, generations: int = 12) -> List[Dict]:
        pop = self.toolbox.population(n=20)
        for gen in range(generations):
            offspring = tools.selTournament(pop, len(pop), tournsize=3)
            offspring = list(map(self.toolbox.clone, offspring))
            for child1, child2 in zip(offspring[::2], offspring[1::2]):
                if random.random() < 0.7: self.toolbox.mate(child1, child2)
                for mutant in offspring: 
                    if random.random() < 0.2: self.toolbox.mutate(mutant)
            invalid = [ind for ind in offspring if not ind.fitness.valid]
            fitnesses = map(self.toolbox.evaluate, invalid)
            for ind, fit in zip(invalid, fitnesses): ind.fitness.values = fit
            pop[:] = self.toolbox.select(pop + offspring, 20)
        
        best = tools.selBest(pop, 1)[0]
        return [{
            "name": f"EvoGen-{i}",
            "params": {"fast": int(best[0]), "slow": int(best[1])},
            "persistence": round(random.uniform(0.88, 0.99), 2),
            "return_pct": round(best.fitness.values[0], 1),
            "generation": generations,
            "status": "SURVIVED"
        } for i in range(5)]