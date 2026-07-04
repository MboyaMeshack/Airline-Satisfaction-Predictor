"""
This module wires together configuration, logging, CORS, the predictor
service, and the three public endpoints (/, /health, /predict). It contains
no model logic itself -- all inference lives in `services.predictor`.
"""

from __future__ import annotations

import logging
from pathlib import Path

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from schemas.schemas import (
    ErrorResponse,
    HealthResponse,
    PredictionRequest,
    PredictionResponse,
    RootResponse,
)
from services.predictor import (
    ArtifactLoadError,
    PredictionFailedError,
    PredictorService,
    UnknownCategoryError,
)


# Logging configuration

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("airline_satisfaction.api")


# Configuration

BASE_DIR = Path(__file__).resolve().parent.parent
ARTIFACTS_DIR = BASE_DIR / "artifacts"

# Origins allowed to call this API during development. 
ALLOWED_ORIGINS = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]


# App + service instantiation

app = FastAPI(
    title="Airline Passenger Satisfaction Prediction API",
    description=(
        "Serves predictions from a pre-trained XGBoost model that "
        "classifies airline passengers as 'Satisfied' or "
        "'Neutral or Dissatisfied'."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor_service = PredictorService(artifacts_dir=ARTIFACTS_DIR)



# Startup

@app.on_event("startup")
def on_startup() -> None:
    """Load model artifacts exactly once when the application starts."""
    logger.info("Starting Airline Passenger Satisfaction Prediction API")
    try:
        predictor_service.load()
    except ArtifactLoadError:
        # Log and re-raise so the app fails fast if artifacts are missing
        # or corrupted rather than serving broken predictions.
        logger.exception("Startup failed: could not load model artifacts")
        raise



# Exception handlers

@app.exception_handler(ValidationError)
async def pydantic_validation_handler(
    request: Request, exc: ValidationError
) -> JSONResponse:
    """Return a clean 422 response for Pydantic validation failures."""
    logger.warning("Validation error on %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ErrorResponse(detail=str(exc)).model_dump(),
    )


@app.exception_handler(UnknownCategoryError)
async def unknown_category_handler(
    request: Request, exc: UnknownCategoryError
) -> JSONResponse:
    """Return a 422 with a descriptive message for unseen categorical values."""
    logger.warning("Unknown category on %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ErrorResponse(detail=str(exc)).model_dump(),
    )


@app.exception_handler(PredictionFailedError)
async def prediction_failed_handler(
    request: Request, exc: PredictionFailedError
) -> JSONResponse:
    """Return a 500 when preprocessing or inference fails unexpectedly."""
    logger.error("Prediction failed on %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(detail="Prediction failed. Please try again.").model_dump(),
    )


@app.exception_handler(ArtifactLoadError)
async def artifact_load_error_handler(
    request: Request, exc: ArtifactLoadError
) -> JSONResponse:
    """Return a 503 if the model is not ready to serve predictions."""
    logger.error("Artifact/service unavailable on %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content=ErrorResponse(
            detail="Prediction service is not ready. Please try again shortly."
        ).model_dump(),
    )


# --------------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------------
@app.get("/", response_model=RootResponse, tags=["Meta"])
async def read_root() -> RootResponse:
    """Basic liveness/info endpoint."""
    return RootResponse(message="Airline Satisfaction Prediction API")


@app.get("/health", response_model=HealthResponse, tags=["Meta"])
async def health_check() -> HealthResponse:
    """
    Health check endpoint.

    Returns healthy only in the trivial sense that the process is up;
    readiness (model loaded) is enforced via the ArtifactLoadError handler
    on /predict, so a broken deployment surfaces clearly on first use.
    """
    return HealthResponse(status="healthy")


@app.post(
    "/predict",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Prediction"],
    responses={
        422: {"model": ErrorResponse, "description": "Validation error"},
        500: {"model": ErrorResponse, "description": "Prediction failure"},
        503: {"model": ErrorResponse, "description": "Service not ready"},
    },
)
async def predict(payload: PredictionRequest) -> PredictionResponse:
    """
    Predict passenger satisfaction from submitted flight/service data.

    The request body must match the frontend's field names exactly (see
    `schemas.schemas.PredictionRequest`). Categorical fields are validated
    against the fitted label encoders; unknown values produce a 422 with a
    descriptive error rather than a silent misprediction.
    """
    logger.info("Received prediction request")
    raw_data = payload.to_raw_dict()
    label = predictor_service.predict(raw_data)
    logger.info("Returning prediction: %s", label)
    return PredictionResponse(prediction=label)
