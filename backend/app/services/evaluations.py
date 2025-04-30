import httpx
import json
import re
from models.schemas import EvaluationRequest, EvaluationResponse, EvaluationCreate
from core.config import OPENROUTER_API_KEY, HTTP_REFERER
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models.models import Evaluation
from fastapi import HTTPException


def create_evaluation(db: Session, evaluation: EvaluationCreate):
    db_evaluation = Evaluation(
        question=evaluation.question,
        ideal_answer=evaluation.ideal_answer,
        key_points=json.dumps(evaluation.key_points),
    )
    db.add(db_evaluation)
    db.commit()
    db.refresh(db_evaluation)
    return db_evaluation


async def evaluate_student_answer(
    db: Session, evaluation: EvaluationRequest
) -> EvaluationResponse:
    db_eval = (
        db.query(Evaluation).filter(Evaluation.id == evaluation.evaluation_id).first()
    )

    if not db_eval:
        raise HTTPException(status_code=404, detail="Evaluation not found.")

    system_prompt = (
        "You are an expert paper evaluator. "
        "Based on the provided question, ideal answer, and key points, "
        "give a score from 0 to 10 in integers for the student's answer and short feedback."
    )

    key_points = db_eval.key_points if isinstance(db_eval.key_points, list) else []

    user_prompt = (
        f"Question: {db_eval.question}\n\n"
        f"Ideal Answer: {db_eval.ideal_answer}\n\n"
        f"Key Points: {', '.join(key_points)}\n\n"
        f"Student's Answer: {evaluation.student_answer}\n\n"
        "Evaluate the student's answer and respond ONLY in pure JSON format like this:\n"
        '{"score": <float>, "feedback": "<feedback_text>"}'
    )

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": HTTP_REFERER,
        "Content-Type": "application/json",
    }

    payload = {
        "model": "google/gemini-2.0-flash-exp:free",  # Example free model
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
        )

    response_json = response.json()
    print(response_json)

    try:
        # Clean the model's response
        content = response_json["choices"][0]["message"]["content"]
        content = content.strip()

        # Remove markdown code block if present
        if content.startswith("```"):
            content = re.sub(r"^```[a-zA-Z]*\n", "", content)  # Remove ```json
            content = content.rstrip("```")  # Remove ending ```
            content = content.strip()

        parsed = json.loads(content)
        return EvaluationResponse(score=parsed["score"], feedback=parsed["feedback"])

    except Exception as e:
        print("Error parsing LLM response:", e)
        print("Raw content received:", content)
        raise Exception("Failed to evaluate the answer. Please try again.")


def get_all_evaluations(db: Session):
    evaluations = db.query(Evaluation).all()
    return evaluations
