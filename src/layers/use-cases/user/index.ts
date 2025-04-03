import { api } from "@/trpc/server";
import { type Session } from "next-auth";
import { type z } from "zod";
import { type UpdateUserSchema } from "../../data-transfer/user/schema";
import { type User } from "@prisma/client";

export const updateUserUseCase = async (
  session: Session,
  input: z.infer<typeof UpdateUserSchema>,
) => {
  // Validate the user has permission to update the requested record
  await api.user.update(input);
};

export const getCurrentUserUseCase = async (): Promise<User> => {
  // Validate the user has permission to update the requested record
  return await api.user.me();
};
