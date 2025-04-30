from models.schemas import (
    EvaluationRequest,
    EvaluationResponse,
    EvaluationOut,
    EvaluationCreate,
)
from services.evaluations import (
    evaluate_student_answer,
    create_evaluation,
    get_all_evaluations,
)
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import SessionLocal
import json
from typing import List

router = APIRouter()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/evaluate", response_model=EvaluationResponse)
async def evaluate(evaluation: EvaluationRequest, db: Session = Depends(get_db)):
    return await evaluate_student_answer(db, evaluation)


@router.post("/create-evaluation/", response_model=EvaluationOut)
def create_new_evaluation(evaluation: EvaluationCreate, db: Session = Depends(get_db)):
    db_evaluation = create_evaluation(db, evaluation)
    return EvaluationOut(
        id=db_evaluation.id,
        question=db_evaluation.question,
        ideal_answer=db_evaluation.ideal_answer,
        key_points=json.loads(db_evaluation.key_points),
    )


@router.get("/evaluations/", response_model=List[EvaluationOut])
def read_all_evaluations(db: Session = Depends(get_db)):
    evaluations = get_all_evaluations(db)
    result = []
    for ev in evaluations:
        result.append(
            EvaluationOut(
                id=ev.id,
                question=ev.question,
                ideal_answer=ev.ideal_answer,
                key_points=json.loads(ev.key_points),
            )
        )
    return result
