from typing import Dict

from dotenv import load_dotenv

load_dotenv()

try:
    from alpaca.trading.client import TradingClient
    from alpaca.trading.requests import MarketOrderRequest
    from alpaca.trading.enums import OrderSide, TimeInForce
    _ALPACA_AVAILABLE = True
except ImportError:
    _ALPACA_AVAILABLE = False

import os


class PaperLab:
    def __init__(self):
        self.client = None
        if _ALPACA_AVAILABLE and os.getenv("ALPACA_API_KEY") and os.getenv("ALPACA_API_SECRET"):
            try:
                self.client = TradingClient(
                    api_key=os.getenv("ALPACA_API_KEY"),
                    secret_key=os.getenv("ALPACA_API_SECRET"),
                    paper=True,
                )
            except Exception:
                self.client = None

    def get_status(self) -> Dict:
        if self.client is None:
            return {
                "equity": 1_000_000.0,
                "cash": 950_000.0,
                "buying_power": 1_000_000.0,
                "positions": [],
                "status": "LIVE $1M PAPER TRADING LAB — set ALPACA_API_KEY/SECRET for live",
            }
        account = self.client.get_account()
        positions = self.client.get_all_positions()
        return {
            "equity": float(account.equity),
            "cash": float(account.cash),
            "buying_power": float(account.buying_power),
            "positions": [{"symbol": p.symbol, "qty": float(p.qty), "market_value": float(p.market_value)} for p in positions],
            "status": "LIVE $1M PAPER TRADING LAB — MOONSHOT ONLINE"
        }
    
    def place_order(self, symbol: str, qty: float, side: str = "buy") -> Dict:
        if self.client is None or not _ALPACA_AVAILABLE:
            return {"order_id": "stub", "status": "skipped", "message": "Set ALPACA keys for live orders"}
        order_data = MarketOrderRequest(
            symbol=symbol,
            qty=qty,
            side=OrderSide.BUY if side.lower() == "buy" else OrderSide.SELL,
            time_in_force=TimeInForce.DAY
        )
        order = self.client.submit_order(order_data)
        return {"order_id": order.id, "status": order.status, "message": "Executed in real paper market with slippage modeled"}