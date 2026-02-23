# MOONSHOT Quant — Closed-Loop Quant Singularity 2026

CausalForge → EvoAlpha Zoo → Omniverse → Nautilus → Liquidity Teleporter. One cycle. Billions in alpha.

## Project structure

```
moonshot-quant/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app, /demo/full-cycle, all routes
│   │   ├── models/              # SQLModel (Strategy)
│   │   ├── core/                # Backtester
│   │   ├── agents/              # LangGraph swarm
│   │   ├── causal/              # CausalForge PCMCI++
│   │   ├── evoalpha/            # EvoAlpha factory
│   │   ├── omniverse_full/      # Omniverse diffusion
│   │   ├── omniverse/           # Omniverse stub
│   │   ├── nautilus/            # Nautilus backtest engine
│   │   ├── liquidity/           # LiquidityTeleporter
│   │   ├── shadowcrowd/         # ShadowCrowd oracle
│   │   └── execution/           # Paper lab
├── frontend/                    # Next.js cyberpunk dashboard
│   └── app/                     # App router, page.tsx, causal, evo, etc.
├── docker-compose.yml           # Postgres + Redis + backend
├── Dockerfile                   # Backend image
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
└── pyproject.toml
```

## Quick start

### Backend (from repo root)

```bash
# Optional: use SQLite (default if Postgres unreachable)
# export DATABASE_URL=sqlite:///./moonshot_demo.db

cd moonshot-quant
python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

Or with Docker:

```bash
docker compose up -d postgres
# then run uvicorn as above, or:
docker compose up --build backend
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 and click **RUN FULL MOONSHOT CYCLE — 60 SECONDS DEMO**. The backend must be running at http://127.0.0.1:8000.

## Key endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/demo/full-cycle` | Full closed loop; returns persistence_score, total_return, survival_rate, modeled_impact |
| GET  | `/causal/pcmci` | Causal discovery (PCMCI++) |
| GET  | `/evo/evolve?gens=8` | EvoAlpha evolution |
| GET  | `/omniverse/generate?shock=...` | Omniverse futures |
| GET  | `/nautilus/run` | Nautilus backtest |
| GET  | `/liquidity/scan` | Liquidity scan |
| GET  | `/paper/status` | Paper trading status |

## Ready for demo

- **RUN FULL MOONSHOT CYCLE** calls `POST /demo/full-cycle`, shows loading, confetti on success, and a formatted results panel.
- Backend uses SQLite when Postgres is not available; Strategy table is created automatically.
- All pipeline steps are wrapped in error handling; the demo always returns clean JSON.
