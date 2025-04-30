from pydantic import BaseModel
from typing import List


class EvaluationRequest(BaseModel):
    evaluation_id: str
    student_name: str
    student_answer: str


class EvaluationResponse(BaseModel):
    score: float
    feedback: str


class EvaluationCreate(BaseModel):
    question: str
    ideal_answer: str
    key_points: List[str]


class EvaluationOut(BaseModel):
    id: int
    question: str
    ideal_answer: str
    key_points: List[str]

    class Config:
        orm_mode = True
