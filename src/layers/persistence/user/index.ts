import { type RouterContext } from "@/server/api/root";
import { type RouterInputs } from "@/trpc/react";
import { type User } from "@prisma/client";

export async function getUser({ ctx }: { ctx: RouterContext }): Promise<User> {
  const user = await ctx.db.user.findUniqueOrThrow({
    where: {
      id: ctx.session?.user.id,
    },
  });
  return user;
}

export async function updateUser({
  ctx,
  input,
}: {
  ctx: RouterContext;
  input: RouterInputs["user"]["update"];
}): Promise<User> {
  const user = await ctx.db.user.update({
    data: input,
    where: {
      id: ctx.session?.user.id,
    },
  });
  return user;
}
