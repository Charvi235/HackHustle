const BASE_URL = "http://localhost:8080/api/teachers";

export const getTeacherByEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}/email/${email}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch teacher");
  }

  return response.json();
};

export const updateTeacher = async (id: number, data: any) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update teacher");
  }

  return response.json();
};