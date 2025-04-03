import { type RouterContext } from "@/server/api/root";
import { type RouterInputs } from "@/trpc/react";
import { type Post } from "@prisma/client";

export async function createPost({
  ctx,
  input,
}: {
  ctx: RouterContext;
  input: RouterInputs["post"]["create"];
}): Promise<Post> {
  if (!ctx.session) {
    throw new Error("Unauthorized");
  }
  const post = await ctx.db.post.create({
    data: {
      name: input.name,
      createdBy: { connect: { id: ctx.session.user.id } },
    },
  });
  return post;
}

export async function getPostById({
  ctx,
  input,
}: {
  ctx: RouterContext;
  input: RouterInputs["post"]["byId"];
}): Promise<Post> {
  if (!ctx.session) {
    throw new Error("Unauthorized");
  }
  const post = await ctx.db.post.findUniqueOrThrow({
    where: { id: input.id },
  });
  return post;
}

export async function getLatestPost({
  ctx,
}: {
  ctx: RouterContext;
  input?: RouterInputs["post"]["getLatest"];
}): Promise<Post | null> {
  if (!ctx.session) {
    throw new Error("Unauthorized");
  }
  const post = await ctx.db.post.findFirst({
    orderBy: { createdAt: "desc" },
    where: { createdBy: { id: ctx.session?.user.id } },
  });

  return post ?? null;
}
