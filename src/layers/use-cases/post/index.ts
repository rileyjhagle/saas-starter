import { api } from "@/trpc/server";
import { type Session } from "next-auth";
import { type z } from "zod";
import {
  type GetPostSchema,
  type CreatePostSchema,
} from "../../data-transfer/post/schema";
import { type RouterOutputs } from "@/server/api/root";

type GetPostInput = z.infer<typeof GetPostSchema>;
type CreatePostInput = z.infer<typeof CreatePostSchema>;
type GetPostOutput = RouterOutputs["post"]["byId"] | null;

export const getPostUseCase = async (
  session: Session,
  input: GetPostInput,
): Promise<GetPostOutput> => {
  // TODO: Check if user has permission to get a specific post
  // if (!session.user.canGetPost) {
  //   throw new Error("Unauthorized");
  // }

  // Call our API Layer to get a post
  return await api.post.byId(input);
};

export const createPostUseCase = async (
  session: Session,
  input: CreatePostInput,
) => {
  // Validate the user has necessary permissions to create a post
  // if (!session.user.canCreatePost) {
  //   throw new Error("Unauthorized");
  // }

  // Call our API Layer to create a new post
  await api.post.create(input);
};
