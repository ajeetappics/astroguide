// src/types/user.ts

// Placeholder for different user roles. We'll define these more specifically later.

export interface BaseUser {
  id: string;
  userId: string; // Unique identifier for the user
  email: string;
  token: string; // JWT or session token
  fullName?: string; // Optional, for displaying the user's full name
}

export interface UserRegisterPayload {
  dob: Date | null;     // ISO string date like "2025-10-14T18:30:00.000Z"
  gender: "male" | "female" | "other";
  languages: string[];   // array of selected languages
  skills: string[];      // array of selected skills
  phoneType: "android" | "ios";
  email: string;
  fullName: string;
}

// For now, the auth slice can use BaseUser or a union type if needed
export type AuthenticatedUser = BaseUser; // Or a union of specific user types