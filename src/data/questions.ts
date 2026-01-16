export interface Question {
  questionID: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
  topicName: string;
}


export interface Topic {
  id: number;
  name: string;
  questions: Question[][];
}

export interface Subject {
  id: number;
  name: string;
  topics: Topic[];
}

// will do it later
const dummyQuestions: Question[] = [];

export const interviewQuestions: Question[] = dummyQuestions;
export const battleQuestions: Question[] = dummyQuestions;




