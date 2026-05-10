import type { ApiMethodTypes } from "../models/ApiMethodTypes";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const DEFAULT_ERROR_RESPONSE = new Response(
  JSON.stringify({ error: "Fetch Error" }),
  {
    status: 500,
    statusText: "Fetch Error",
    headers: { "Content-Type": "application/json" },
  }
);

interface FetchDataProps<T extends object | FormData> {
  url: string;
  method: ApiMethodTypes;
  body?: T;
  customToken?: string;
  abortSignal?: AbortSignal;
}

export const fetchData = async <T extends object | FormData>({
  url,
  method,
  body,
  customToken,
  abortSignal,
}: FetchDataProps<T>) => {
  const token = customToken ?? localStorage.getItem("token") ?? "";
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const requestInit: RequestInit = {
    method,
    headers,
    body: isFormData ? body : body != null ? JSON.stringify(body) : undefined,
    signal: abortSignal,
  };

  let response: Response;
  try {
    response = await fetch(`${API_URL}${url}`, requestInit);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    response = DEFAULT_ERROR_RESPONSE;
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.message ?? `Request failed with status ${response.status}`;
    const error = new Error(message);
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};