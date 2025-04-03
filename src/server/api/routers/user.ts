import { UpdateUserSchema } from "@/layers/data-transfer/user/schema";
import { getUser, updateUser } from "@/layers/persistence/user";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    const user = getUser({ ctx });
    return user;
  }),
  update: protectedProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await updateUser({ ctx, input });
      return user;
    }),
});
