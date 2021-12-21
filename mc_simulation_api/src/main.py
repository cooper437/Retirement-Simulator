import sys

import uvicorn
from uvicorn.config import LOGGING_CONFIG
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from src.simulation import schemas

from src.simulation.monte_carlo import run_simulations

app = FastAPI()

logger.add(
    sys.stderr, format="{time} {level} {message}", level="WARNING")


@app.get("/")
async def is_alive():
    logger.info("Liveness probe OK")
    return "OK"


@app.post("/simulate", status_code=200)
def simulate(simulation_params_in: schemas.RunSimulationIn):
    run_simulations()
    return "Done"


if __name__ == "__main__":
    LOGGING_CONFIG["formatters"]["default"]["fmt"] \
        = "%(asctime)s [%(name)s] %(levelprefix)s %(message)s"
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000,
                reload=True)
