# from fastapi import FastAPI, UploadFile, File
# from models.schemas import InterviewSetup, EvaluationRequest, InterviewResult
# from services.groq_service import generate_question, evaluate_answer
# from services.speech_service import speech_to_text
# from utils.scoring import calculate_percentage, grade_from_percentage


# from fastapi.middleware.cors import CORSMiddleware
# from routes import interview
# import re


# import uuid


# app = FastAPI(title="AI Interview Backend",debug=True)
# app.include_router(interview.router)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # React app
#     allow_credentials=True,
#     allow_methods=["*"],  # GET, POST, OPTIONS, etc.
#     allow_headers=["*"],
# )


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import InterviewSetup, EvaluationRequest
from services.groq_service import generate_question, evaluate_answer
from utils.scoring import calculate_percentage, grade_from_percentage
from routes import interview

import re
import uuid

print("🔥 MAIN.PY LOADED 🔥")

app = FastAPI(title="AI Interview Backend")

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # frontend baad me dekh lenge
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- ROUTERS --------------------
#app.include_router(interview.router)
app.include_router(interview.router, prefix="/interview")
# -------------------- GLOBAL STORES --------------------
scores_store = []
question_store = {}
current_index = {}

print("GLOBAL VARIABLES INITIALIZED")

# -------------------- UTILS --------------------
def extract_score_from_text(text: str) -> int:
    match = re.search(r'(\d+)\s*/\s*10', text)
    if match:
        return int(match.group(1))
    return 0

# -------------------- INTERVIEW SETUP --------------------
@app.post("/interview/setup")
def interview_setup(data: InterviewSetup):
    print("INTERVIEW SETUP HIT")
    questions = generate_question(
        role=data.role,
        experience=data.experience,
        difficulty=data.difficulty,
        tech_skills=data.tech_skills,
        target_company=data.target_company,
        interview_type=data.interview_type
    )

    session_id = str(uuid.uuid4())

    question_store[session_id] = [
        questions["q1"],
        questions["q2"],
        questions["q3"],
    ]
    current_index[session_id] = 0

    return {
        "session_id": session_id,
        "question": question_store[session_id][0]
    }

print("INTERVIEW SETUP ENDPOINT DEFINED")

# -------------------- NEXT QUESTION --------------------
@app.post("/interview/next-question")
def next_question(session_id: str):
    if session_id not in question_store:
        return {"error": "Invalid session"}

    current_index[session_id] += 1

    if current_index[session_id] < len(question_store[session_id]):
        return {
            "question": question_store[session_id][current_index[session_id]]
        }

    return {"done": True}

print("NEXT QUESTION ENDPOINT DEFINED")

# -------------------- EVALUATE --------------------
@app.post("/interview/evaluate")
def evaluate(data: EvaluationRequest):
    if not data.answer or not data.answer.strip():
        return {
            "score": 0,
            "feedback": "No answer provided.",
            "betterAnswer": "No answer provided."
        }

    score, feedback, ideal_answer = evaluate_answer(data.question, data.answer)
    scores_store.append(score)
    print(data, score, feedback)
    return {
        "score": score,
        "feedback": feedback,
        "betterAnswer": ideal_answer
    }
    
print("EVALUATE ENDPOINT DEFINED")

# -------------------- FINAL RESULT --------------------
@app.get("/interview/result")
def final_result():
    if not scores_store:
        return {
            "percentage": 0,
            "grade": "N/A"
        }

    percentage = calculate_percentage(scores_store)
    grade = grade_from_percentage(percentage)
    print("FINAL RESULT CALCULATED:", percentage, grade)
    return {
        "percentage": percentage,
        "grade": grade
    }

print("RESULT ENDPOINT DEFINED")
