/**
 * continuation.service.ts
 *
 * Story continuation AI service.
 *
 * FIX #4  — PR #1413 fixed the hardcoded localhost in this file.
 *           This version uses API_V1 from api.config.ts (the proper long-term fix
 *           vs the PR which only used import.meta.env.VITE_BASE_URL inline).
 * Added   — Typed request/response interfaces.
 * Added   — Consistent error handling.
 */

import { API_V1 } from "../config/api.config";

export interface ContinuationPayload {
  storyId: string;
  currentContent: string;
  tone?: string;
  direction?: string;
}

export interface ContinuationResponse {
  continuation: string;
  updatedContent: string;
}

export async function continueStory(
  payload: ContinuationPayload
): Promise<ContinuationResponse> {
  const token = localStorage.getItem("token");

  let response: Response;

  try {
    // FIX #4 — was: "http://localhost:5000/api/v1/story-continuation/continue"
    response = await fetch(`${API_V1}/story-continuation/continue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to connect to the server. Story continuation failed.");
  }

  if (!response.ok) {
    let msg = `Continuation failed (${response.status})`;
    try {
      const body = await response.json();
      msg = body?.message ?? body?.error ?? msg;
    } catch { /* non-JSON */ }
    throw new Error(msg);
  }

  return response.json() as Promise<ContinuationResponse>;
}
