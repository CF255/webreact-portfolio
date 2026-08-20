import { API_URL } from "./constants";
import { AuthResponse, AuthResponseError } from "../types/types";

export async function loginRequest(username: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw json as AuthResponseError;
  }

  return json as AuthResponse;
}
