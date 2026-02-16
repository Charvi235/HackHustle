import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getStudentByEmail = async (emailId: string) => {
  const response = await axios.get(
    `${BASE_URL}/students/${emailId}`
  );
  return response.data;
};

export const updateStudent = async (
  studentId: number,
  studentData: any
) => {
  const response = await axios.put(
    `${BASE_URL}/students/${studentId}`,
    studentData
  );
  return response.data;
};

export const getVisitedQuestions = async (emailId: string) => {
  const response = await axios.get(
    `${BASE_URL}/questionstatus/visited`,
    {
      params: { emailId }
    }
  );
  return response.data; // returns List<Long>
};
