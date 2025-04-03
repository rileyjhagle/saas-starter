import { auth } from "@/server/auth";
import { type Session } from "next-auth";

export const assertAuthenticated = async (): Promise<Session> => {
  const session = await auth();
  if (session === null) {
    throw new Error("User is not authenticated");
  }
  return session;
};
