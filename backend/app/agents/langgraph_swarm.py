from langgraph.graph import StateGraph, END
from typing import TypedDict, Dict

from backend.app.causal.causal_forge import CausalForge


class AgentState(TypedDict):
    hypothesis: str
    persistence_score: float
    backtest_result: Dict
    evolved: bool


class MoonshotSwarm:
    def __init__(self):
        self.backtester = None  # Will connect to existing

    def researcher(self, state: AgentState) -> AgentState:
        state["hypothesis"] = "Causal link: Order-flow imbalance drives 3-day momentum in SPY"
        return state

    def causal_validator(self, state: AgentState) -> AgentState:
        forge = CausalForge()
        result = forge.discover_causal_dag("SPY")
        state["persistence_score"] = result["persistence_score"]
        state["hypothesis"] = result["hypothesis"]
        return state
    
    def evoalpha_mutator(self, state: AgentState) -> AgentState:
        state["evolved"] = True
        state["backtest_result"] = {"total_return_pct": 18.7, "sharpe": 2.1}  # Will call real backtester later
        return state
    
    def build_graph(self):
        workflow = StateGraph(AgentState)
        workflow.add_node("researcher", self.researcher)
        workflow.add_node("causal_validator", self.causal_validator)
        workflow.add_node("evo_mutator", self.evoalpha_mutator)
        
        workflow.set_entry_point("researcher")
        workflow.add_edge("researcher", "causal_validator")
        workflow.add_edge("causal_validator", "evo_mutator")
        workflow.add_edge("evo_mutator", END)
        
        return workflow.compile()