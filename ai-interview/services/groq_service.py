

import os
from groq import Groq
from dotenv import load_dotenv
import json
import re
import random
import time

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
) 


FORBIDDEN_KEYWORDS = [
    "implement",
    "write code",
    "code",
    "program",
    "syntax",
    "Design",
    "pseudocode",
    "develop",
    "coding",
    "example code"
]

TECHNICAL_DEFAULTS = {

    "frontend developer": [
        "What is the difference between state and props in React?",
        "How does the virtual DOM improve performance in frontend frameworks?",
        "What strategies can be used to optimize page load time in web applications?",
        "Explain how component reusability improves maintainability in frontend development.",
        "What are the advantages of using TypeScript in frontend projects?",
        "How do browsers render HTML, CSS, and JavaScript to display a webpage?",
        "How do you optimize images and assets for the web?",
        "How do you ensure accessibility in web applications?",
        "How do browsers handle CSS layout and rendering?",
        "What strategies help maintain large frontend codebases?",
        "How does lazy loading improve application performance?",
        "What problems can arise from excessive DOM manipulation?",
        "How do design systems help maintain UI consistency?",
        "What are the benefits of modular frontend architecture?",
        "How can caching improve frontend performance?",
        "What trade-offs exist between client-side and server-side rendering?",
        "How does code splitting improve performance?",
        "What are the main challenges in building scalable frontend applications?"
    ],

    "backend developer": [
        "What is the role of middleware in backend frameworks?",
        "How does a REST API differ from a GraphQL API?",
        "What techniques can improve scalability in backend systems?",
        "Explain the importance of database indexing.",
        "What is the difference between synchronous and asynchronous processing?",
        "How do authentication and authorization differ in backend systems?",
        "What factors influence the choice between arrays and linked lists for backend processing?",
        "How do queues help manage background tasks in server architectures?",
        "When would you prefer using a hash table over a tree structure in backend systems?",
        "What role do stacks play in handling function calls and request processing?",
        "How can trees be useful in organizing hierarchical backend data?",
        "What advantages do hash maps provide for fast data retrieval in backend applications?",
        "How do backend systems handle high traffic loads?",
        "What are the advantages of microservices architecture?",
        "What techniques help ensure data consistency?",
        "What are the benefits of message queues?",
        "What challenges arise when scaling backend infrastructure?",
        "What is the role of load balancing?",
        "What strategies help manage database transactions?",
        "What architectural decisions affect backend maintainability?"
    ],

    "full stack developer": [
        "How do frontend and backend components communicate in a web application?",
        "What considerations are important when designing a full stack architecture?",
        "How can you improve performance across both frontend and backend layers?",
        "What are the benefits of using APIs in full stack development?",
        "Explain the role of state management in modern web applications.",
        "How can caching improve the performance of full stack applications?"
    ],

    "data scientist": [
        "What is the difference between supervised and unsupervised learning?",
        "How do you evaluate the performance of a machine learning model?",
        "What challenges arise when working with imbalanced datasets?",
        "Explain the importance of feature engineering in machine learning.",
        "What are the differences between classification and regression problems?",
        "How can overfitting affect machine learning models?",
        "What problems arise when training data is biased?",
        "What strategies help improve model accuracy?",
        "What challenges arise when interpreting machine learning models?",
        "What considerations exist when deploying ML models?",
        "What metrics evaluate classification performance?",
        "What are common pitfalls in machine learning experiments?",
        "What role does data preprocessing play in model performance?"
    ],

    "software engineer": [
        "What are the principles of object-oriented design?",
        "How does version control help teams collaborate on software projects?",
        "What is the importance of writing maintainable code?",
        "How do design patterns improve software architecture?",
        "Explain the concept of modular programming.",
        "Why is testing important in software development?",
        "What challenges occur when integrating multiple systems?",
        "What strategies improve code readability?",
        "What techniques ensure software reliability?",
        "What are the benefits of continuous integration?",
        "What challenges arise when maintaining legacy systems?",
        "What strategies improve system performance?",
        "What role does automation play in software engineering?",
        "What techniques improve system resilience?"
    ]
}

BEHAVIORAL_DEFAULTS = [
    "How do you handle situations when project requirements suddenly change?",
    "What approach do you take when working with a difficult teammate?",
    "How do you prioritize tasks when multiple deadlines overlap?",
    "A project you are working on suddenly changes direction due to new business goals. How would you adapt your approach?",
    "Imagine a teammate consistently misses deadlines that affect your work. How would you handle the situation?",
    "Describe how you stay productive during high-pressure situations.",
    "How do you ensure clear communication in team projects?",
    "What motivates you to perform well at work?",
    "A team decision is made that you personally disagree with. How would you handle the situation?",
    "You are leading a small initiative and notice team motivation dropping. What would you do?",
    "How do you respond to constructive criticism from your manager?",
    "What steps do you take to continuously improve your professional skills?",
    "How do you approach learning a completely new technology?",
    "How do you maintain work-life balance in demanding projects?",
    "You are working with a tight deadline but a teammate asks for help with their task. How would you balance both responsibilities?",
    "Describe how you contribute to a positive team environment.",
    "How do you handle disagreements during team decision making?",
    "How do you approach decision making when information is limited?",
    "A teammate proposes an idea that you believe may not work well. How would you handle the discussion?",
    "You are assigned to a project outside your main expertise. How would you approach it?",
    "Your team receives negative feedback from stakeholders about a recent release. How would you contribute to improving the situation?",
    "You notice that a process your team follows is inefficient. How would you introduce improvements?",
]

def is_valid_verbal_question(question: str) -> bool:
    question_lower = question.lower()

    # reject if forbidden keyword exists
    if any(keyword in question_lower for keyword in FORBIDDEN_KEYWORDS):
        return False

    # ensure it is a question
    if "?" not in question:
        return False

    # minimum length check
    if len(question.split()) < 6:
        return False

    return True

def _generate_from_llm(prompt: str) -> str:

    try:
        
        response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
        top_p=0.9
        )
        print("✅ Groq response received")
        return response.choices[0].message.content.strip()

    except Exception as e:
        print("❌ GROQ ERROR:", repr(e))
        raise



def generate_question(role, experience, difficulty, tech_skills=None, target_company=None, interview_type="technical"):

    print(f"Generating question with: role={role}, experience={experience}, difficulty={difficulty}, tech_skills={tech_skills}, target_company={target_company}, interview_type={interview_type}")
    # ---------- BASE PROMPT (ALWAYS INITIALIZED) ----------
    prompt = f"""
You are an AI interviewer conducting a {interview_type.upper()} interview.

Role: {role}
Experience level: {experience}
Difficulty: {difficulty}
"""

    # ---------- TECHNICAL vs BEHAVIORAL VARIATION ----------
    if interview_type == "technical":
        if tech_skills and len(tech_skills) > 0:
            skills_text = ", ".join(tech_skills)
            prompt += f"\nBase the questions on these technical skills: {skills_text}"
        else:
            prompt += f"\nBase the questions on general software engineering concepts for a {role} role."

    elif interview_type == "behavioral":

        prompt += f"""
    
Generate 3 COMPLETELY DIFFERENT behavioral interview questions.

Rules:
- Each question must focus on a different workplace situation
- Be unique from common textbook questions
- Avoid generic phrases like:
    * "Tell me about a time..."
    * "Describe a challenge..."
    * "Describe a conflict..."

Questions should sound natural and realistic.
"""
        
    # Add tech skills ONLY if provided
    if tech_skills:
        skills_text = ", ".join(tech_skills)
        prompt += f"\nBase the question on these technical skills: {skills_text}"

    # ---------- COMPANY CONTEXT (UNCHANGED FUNCTIONALITY) ----------
    if target_company:
        prompt += f"\nKeep the question aligned with {target_company}'s interview style."

    # ---------- DIFFICULTY AFFECTS QUESTION STYLE ----------
    difficulty_styles = {
        "easy": "Ask a simple, conceptual question suitable for beginners.",
        "medium": "Ask a practical question that requires reasoning and trade-offs.",
        "hard": "Ask a deep, system-design or advanced problem-solving question."
    }

    prompt += f"\n{difficulty_styles.get(difficulty.lower(), 'Ask a balanced technical question.')}"

    # ---------- ASK FOR 3 DIFFERENT QUESTIONS ----------
    prompt += """

IMPORTANT FORMAT RULES:
Return EXACTLY 3 questions.
Each must end with a question mark.
Do NOT include explanations.

Format strictly like:

1) Question here?
2) Question here?
3) Question here?
"""

    # Retry mechanism
    for attempt in range(5):

        response = _generate_from_llm(prompt)

        # Extract numbered questions
        questions = re.findall(r"\d+\)\s*(.*?\?)", response)

        # fallback parse if model uses different numbering
        if len(questions) < 3:
            lines = response.split("\n")
            questions = [l.strip("-• ").strip() for l in lines if "?" in l]

        valid_questions = [
            q.strip()
            for q in questions
            if is_valid_verbal_question(q)
        ]

        if len(valid_questions) >= 3:
            return {
                "q1": valid_questions[0],
                "q2": valid_questions[1],
                "q3": valid_questions[2]
            }
        print(f"Retry attempt {attempt+1} failed, retrying...")
        time.sleep(0.5)

    role_key = role.lower()

# TECHNICAL DEFAULTS
    if interview_type == "technical":

        role_questions = TECHNICAL_DEFAULTS.get(
           role_key,
           TECHNICAL_DEFAULTS["software engineer"]
        )

        selected = random.sample(role_questions, 3)

# BEHAVIORAL DEFAULTS
    else:
       selected = random.sample(BEHAVIORAL_DEFAULTS, 3)

    return {
       "q1": selected[0],
       "q2": selected[1],
       "q3": selected[2]
    }



def evaluate_answer(question, answer):
    prompt = f"""
You are a VERY STRICT technical interviewer.

Interview Question:
{question}

Candidate Answer:
{answer}

Step 1:
Write the IDEAL / CORRECT answer to the interview question.
Rules for Ideal Answer:
- Maximum 120 words
- Write in 3 to 5 short paragraphs
- Each paragraph should contain 1 or 2 sentences
- Separate each paragraph using a blank line
- Do NOT use bullet points
- Do NOT use symbols like *, -, or #
- Do NOT write the answer as a single paragraph
- Use clear professional technical language

Step 2:
Compare the candidate answer with the ideal answer.

Evaluation Criteria:
- Technical accuracy
- Completeness
- Clarity
- Relevance

STRICT Scoring Rules:

0 = Completely incorrect or meaningless answer
1 = Very poor answer but contains a small correct idea
2 = Mostly incorrect but has a small relevant concept
3-4 = Partially correct but missing major concepts
5-6 = Basic understanding but incomplete
7-8 = Mostly correct with small gaps
9 = Very strong answer
10 = Perfect answer

IMPORTANT RULES:
- If the answer is completely incorrect or meaningless → score 0
- If the answer contains at least one correct idea → score at least 1
- Do NOT give high scores for short or incomplete answers
- Be strict but fair like a real technical interviewer

Respond ONLY in this format. Do NOT write anything else.

Ideal Answer:
<correct interview answer>

Score: <single number between 0 and 10>

Feedback:
<short explanation of why the score was given>
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}]
    )

    ai_text = response.choices[0].message.content.strip()

    print("AI RAW RESPONSE:\n", ai_text)   # debugging

    # -------- Extract Ideal Answer --------
    ideal_answer = ""
    ideal_match = re.search(r"Ideal Answer:\s*(.*?)(?:Score:)", ai_text, re.DOTALL)
    if ideal_match:
        ideal_answer = ideal_match.group(1).strip()

    # ---- Extract Score ----
    score_match = re.search(r"Score:\s*(\d+)", ai_text, re.IGNORECASE)

    if not score_match:
       score_match = re.search(r"score\s*(?:of)?\s*(\d+)", ai_text, re.IGNORECASE)

    score = int(score_match.group(1)) if score_match else 0
    score = max(0, min(score, 10))
    # ---- Extract Feedback ----
    feedback_match = re.search(r"Feedback:\s*(.*)", ai_text, re.DOTALL)
    feedback = feedback_match.group(1).strip() if feedback_match else ai_text

    return score, feedback, ideal_answer


 