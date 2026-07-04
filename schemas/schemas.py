from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, ConfigDict


class PredictionRequest(BaseModel):
    """
   Data received from the frontend's Prediction page.

    """

    model_config = ConfigDict(populate_by_name=True, str_strip_whitespace=True)

    gender: str = Field(..., alias="Gender", min_length=1)
    age: int = Field(..., alias="Age", ge=0, le=120)
    customer_type: str = Field(..., alias="Customer Type", min_length=1)
    type_of_travel: str = Field(..., alias="Type of Travel", min_length=1)
    travel_class: str = Field(..., alias="Class", min_length=1)

    flight_distance: int = Field(..., alias="Flight Distance", ge=0)
    departure_delay_in_minutes: int = Field(
        ..., alias="Departure Delay in Minutes", ge=0
    )

    inflight_wifi_service: int = Field(..., alias="Inflight wifi service", ge=0, le=5)
    departure_arrival_time_convenient: int = Field(
        ..., alias="Departure/Arrival time convenient", ge=0, le=5
    )
    ease_of_online_booking: int = Field(
        ..., alias="Ease of Online booking", ge=0, le=5
    )
    gate_location: int = Field(..., alias="Gate location", ge=0, le=5)
    food_and_drink: int = Field(..., alias="Food and drink", ge=0, le=5)
    online_boarding: int = Field(..., alias="Online boarding", ge=0, le=5)
    seat_comfort: int = Field(..., alias="Seat comfort", ge=0, le=5)
    inflight_entertainment: int = Field(
        ..., alias="Inflight entertainment", ge=0, le=5
    )
    on_board_service: int = Field(..., alias="On-board service", ge=0, le=5)
    leg_room_service: int = Field(..., alias="Leg room service", ge=0, le=5)
    baggage_handling: int = Field(..., alias="Baggage handling", ge=0, le=5)
    checkin_service: int = Field(..., alias="Checkin service", ge=0, le=5)
    inflight_service: int = Field(..., alias="Inflight service", ge=0, le=5)
    cleanliness: int = Field(..., alias="Cleanliness", ge=0, le=5)

    def to_raw_dict(self) -> dict[str, int | str]:
        """Return the payload keyed by the original frontend field names."""
        return self.model_dump(by_alias=True)


class PredictionResponse(BaseModel):
    """Response returned by POST /predict."""

    prediction: Literal["Satisfied", "Neutral or Dissatisfied"]


class HealthResponse(BaseModel):
    """Response returned by GET /health."""

    status: Literal["healthy"]


class RootResponse(BaseModel):
    """Response returned by GET /."""

    message: str


class ErrorResponse(BaseModel):
    """Standard shape for error responses returned by the API."""

    detail: str
