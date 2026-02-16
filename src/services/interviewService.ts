
const API_BASE = "http://localhost:8000";

export const interviewService = {
  setupInterview: async (data: {
    role: string;
    experience: string;
    difficulty: string;
    tech_skills: string[];
    target_company?: string;
    interview_type: string;
  }) => {
    const res = await fetch(`${API_BASE}/interview/setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json(); // { question: string }
  },

  evaluateAnswer: async (question: string, answer: string) => {
    const res = await fetch(`${API_BASE}/interview/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });

    return res.json(); // OBJECT from backend
  },

  speechToText: async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "answer.ogg");

    const res = await fetch(`${API_BASE}/interview/speech-to-text`, {
      method: "POST",
      body: formData,
    });

    return res.json(); // { text: "recognized speech" }
  },
  getNextQuestion: async (sessionId: string) => {
    const res = await fetch(
      `${API_BASE}/interview/next-question?session_id=${sessionId}`,
      {
        method: "POST",
      }
    );

    return res.json();
  },
};
