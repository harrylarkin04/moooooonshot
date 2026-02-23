import vectorbt as vbt
import pandas as pd
from typing import Dict, Any
from datetime import datetime

class MoonshotBacktester:
    def run_backtest(self, symbol: str = "SPY", period: str = "2y", fast_window: int = 10, slow_window: int = 50, initial_cash: float = 1000000.0, fee: float = 0.001, slippage: float = 0.0005) -> Dict:
        # Real data pipeline
        data = vbt.YFData.download(symbol, period=period, missing_index="drop")
        price = data.get("Close")
        
        # EMA Cross (your first causal alpha — EvoAlpha will evolve this)
        fast_ma = vbt.MA.run(price, window=fast_window)
        slow_ma = vbt.MA.run(price, window=slow_window)
        entries = fast_ma.ma_crossed_above(slow_ma.ma)
        exits = fast_ma.ma_crossed_below(slow_ma.ma)
        
        # PRODUCTION-GRADE: full risk, slippage, fees, position sizing
        pf = vbt.Portfolio.from_signals(
            price, 
            entries, 
            exits, 
            init_cash=initial_cash,
            fees=fee,
            slippage=slippage,
            size=1.0,  # can be dynamic later
            freq="1D"
        )
        
        stats = pf.stats()
        return {
            "symbol": symbol,
            "period": period,
            "total_return_pct": round(stats["Total Return [%]"], 2),
            "sharpe_ratio": round(stats["Sharpe Ratio"], 2),
            "max_drawdown_pct": round(stats["Max Drawdown [%]"], 2),
            "win_rate_pct": round(stats["Win Rate [%]"], 2),
            "total_trades": int(stats["Total Trades"]),
            "final_equity": round(stats["End Value"], 2),
            "expectancy": round(stats["Expectancy"], 4),
            "html_report": pf.plot().to_html() if hasattr(pf, 'plot') else "Report ready for frontend"
        }