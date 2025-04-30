# 📄 Paper Evaluator AI

**Paper Evaluator AI** is a web application that allows educators to create question evaluations with ideal answers and key points, and then enables automated scoring of student answers using LLMs (via OpenRouter API).  
This project contains:

- ✨ **Frontend** built with **React**
- 🚀 **Backend** powered by **FastAPI**
- 🤖 LLM-based evaluation logic for student answers

---

## 📁 Project Structure

paper-evaluator-ai/ ├── frontend/ # React-based web app ├── backend/ # FastAPI server for evaluation and DB └── README.md # You're here!

yaml
Copy
Edit

---

## 🔧 Prerequisites

Before running the project, make sure you have:

- Node.js (v16 or newer)
- Python 3.9+
- Git
- A virtual environment manager (optional but recommended)

---

## 🧭 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/paper-evaluator-ai.git
cd paper-evaluator-ai
2️⃣ Run the Backend (FastAPI)
bash
Copy
Edit
cd backend

# [Optional] Create virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
touch .env
Edit .env and add:

ini
Copy
Edit
OPENROUTER_API_KEY=your-openrouter-api-key
HTTP_REFERER=your-project-referer-url
Run the backend:

bash
Copy
Edit
uvicorn main:app --reload
FastAPI will start at: http://localhost:8000

3️⃣ Run the Frontend (React)
In a separate terminal:

bash
Copy
Edit
cd frontend

# Install dependencies
npm install

# Start development server
npm start
React app will run at: http://localhost:3000

✨ Features
Create Evaluations with questions, ideal answers, and key points

Submit student answers

Automatic scoring using LLM via OpenRouter API

Simple and intuitive UI

🧪 API Testing (Optional)
FastAPI docs available at:
http://localhost:8000/docs

📌 Tech Stack
Frontend: React, React Router

Backend: FastAPI, SQLAlchemy

LLM: OpenRouter API (Gemma 3 27B or other)

🤝 Contributions
Contributions are welcome! Please open issues or submit a pull request.
