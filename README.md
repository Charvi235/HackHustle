# Hack Hustle

## Overview
Hack Hustle is an AI-powered learning and assessment platform designed to help students practice, evaluate, and improve their technical skills in a structured and interactive way. The platform focuses on real-time learning, performance tracking, and personalized feedback rather than traditional testing systems.

Unlike conventional platforms, Hack Hustle emphasises **practice, mock interviews, and doubt resolution**, enabling students to learn effectively and continuously improve.

---

## Key Features

### Practice Module
- Subject-wise and topic-wise categorised questions  
- Automatically generated MCQs  
- Helps students strengthen core concepts  

---

### Quiz Module
- Interactive quizzes with real-time participation  
- Performance tracking after each quiz  
- Instant feedback for improvement  

---

### AI Mock Interview Module
- Simulates real interview scenarios  
- AI asks questions dynamically  
- Records user responses  
- Generates:
  - Interview summary  
  - Performance evaluation  
  - Strengths & improvement areas  

---

### Doubt Resolution Module
- Students can post doubts  
- Teachers can:
  - View student queries  
  - Provide detailed explanations  
- Focus is on **guidance and mentorship**, not test creation  

---

### Progress Tracking
- Tracks student performance topic-wise  
- Displays completion percentage  
- Helps users identify weak areas

---

### Teacher Module
- Interactive doubt solving  
- Can view number of students mentored  
- Can view his/her rating provided by the student

---

### Admin
- Can manage the entire platform functionalities
- Can perform basic CRUD operations on subjects/topics/questions 
- Have full access of users of the platform

---

## Tech Stack

| Technology     | Usage                          |
|---------------|--------------------------------|
| Java          | Core backend logic             |
| Spring Boot   | REST API development           |
| MySQL         | Database management            |
| React         | Frontend UI development        |
| Python        | AI/ML functionalities          |

---

## System Architecture

- **Frontend (React)**  
  Handles UI/UX and communicates with backend via REST APIs  

- **Backend (Spring Boot)**  
  Manages business logic, authentication, quizzes, and APIs  

- **Database (MySQL)**  
  Stores users, questions, results, and doubts  

- **AI Module (Python)**  
  Handles interview analysis and feedback generation  

---

## Authentication & Security
- User login system  
- Session validation  
- Secure API communication  

---

## Real-Time Features
- Quiz synchronization using WebSockets  
- Ensures all participants receive questions simultaneously  
- Maintains session consistency  

---

## Project Structure
```
HackHustle/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── ai-module/
│   ├── interview-analysis/
│   └── feedback-generation/
│
└── database/
    └── schema.sql
```

---

## Installation & Setup

### Prerequisites
- Java (JDK 17+)
- Node.js & npm
- MySQL
- Python (3.x)

---

### Backend Setup
- cd backend
- mvn clean install
- mvn spring-boot:run

---

### Frontend Setup
- cd frontend
- npm install
- npm start

---

### AI Module Setup
- cd ai-module
- pip install -r requirements.txt
- python app.py

---

### Database Setup
- CREATE DATABASE hack_hustle;

- Update your database credentials in `application.properties`.

---

##  API Highlights
- Authentication APIs  
- Quiz APIs  
- MCQ Generation APIs  
- Doubt Resolution APIs  
- Interview Analysis APIs  

---

## Future Enhancements
- AI-based personalized recommendations  
- Voice-based interviews  
- Advanced analytics dashboard  
- Gamification & leaderboard  

---

## Final Note
Hack Hustle is designed to strengthen core subject understanding through structured MCQ-based practice and engaging quiz experiences. The platform focuses on building strong fundamentals in technical subjects while keeping learning interactive, consistent, and performance-driven.
