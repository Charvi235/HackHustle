import { apiClient } from '@/config/api';

export interface CreateAssessmentRequest {
  emailId: string;
  subjectID?: number;
  topicID?: number;
  assessmentScore?: number;
  
}

export const assessmentService = {
  createAssessment: async (payload: CreateAssessmentRequest) => {
    return apiClient.post('/api/assessments', payload);
  }
};
