import { apiClient } from '@/config/api';

export interface QuestionDto {
  questionID: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
  topicName: string;
}

export const questionService = {
  getQuestionsByTopic: async (
    topicName: string
  ): Promise<QuestionDto[]> => {
    return apiClient.get(
      `/api/question/topic/${encodeURIComponent(topicName)}`
    );
  },

  getQuestionsBySubject: async (
    subjectId: number
  ): Promise<QuestionDto[]> => {
    return apiClient.get(
      `/api/question/subject/${subjectId}`
    );
  },
  getVisitedQuestions: async (emailId: string): Promise<number[]> => {
    return apiClient.get(
      `/api/questionstatus/visited/${encodeURIComponent(emailId)}`
    );
  },
   //API for topic-wise assessment
  getTopicAssessmentQuestions: async (
    topicName: string
  ): Promise<QuestionDto[]> => {
    return apiClient.get(
      `/api/question/topicassesment/${encodeURIComponent(topicName)}`
    );
  }
};
