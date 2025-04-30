from sqlalchemy import Column, Integer, String, Text
from core.database import Base


class Evaluation(Base):
    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    ideal_answer = Column(Text, nullable=False)
    key_points = Column(Text, nullable=False)  # Stored as JSON string
