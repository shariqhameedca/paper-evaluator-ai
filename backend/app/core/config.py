import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
HTTP_REFERER = os.getenv("HTTP_REFERER", "paper-evaluator")
