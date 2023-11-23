import axios from "axios";

interface User {
  login: string;
  password: string;
}

interface ApiResponse {
  data: Result;
}

interface Result {
  isLogged: boolean;
  role: "admin" | "user" | null;
}

export const getLogIn = async (data: User): Promise<Result | undefined> => {
  try {
    const response = await axios.post<ApiResponse>(
      "/login",
      JSON.stringify(data),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
