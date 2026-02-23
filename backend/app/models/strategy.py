from datetime import datetime
from typing import Any, Dict, Optional

from sqlalchemy import Column
from sqlalchemy.types import JSON
from sqlmodel import Field, SQLModel


class Strategy(SQLModel, table=True):
    id: str = Field(primary_key=True)
    name: str
    description: Optional[str] = None
    params: Dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    persistence_score: float = 0.0
    total_return: float = 0.0
    status: str = "EVOLVING"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    generation: int = 0  # Darwinian generation