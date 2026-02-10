
const API_BASE = "http://localhost:8000";

export const interviewService = {
  setupInterview: async (data: {
    role: string;
    experience: string;
    difficulty: string;
    tech_skills: string[];
    target_company?: string;
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

    return res.text(); // STRING ONLY (as you wanted)
  },
};
