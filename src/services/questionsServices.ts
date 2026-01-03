import { apiClient } from '@/config/api';

/* DTO – matches Spring Boot QuestionDto */
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
  }
};
