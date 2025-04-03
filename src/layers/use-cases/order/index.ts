import { api } from "@/trpc/server";
import { type Session } from "next-auth";
import { type z } from "zod";
import { type UpdateUserSchema } from "../../data-transfer/order/schema";

export const updateUserUseCase = async (
  session: Session,
  input: z.infer<typeof UpdateUserSchema>,
) => {
  // Validate the user has permission to update the requested record
  if (session.user.id !== input.id) {
    throw new Error("Unauthorized");
  }

  await api.user.update(input);
};
