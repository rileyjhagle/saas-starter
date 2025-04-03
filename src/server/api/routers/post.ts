import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  createPost,
  getLatestPost,
  getPostById,
} from "@/layers/persistence/post";
import {
  CreatePostSchema,
  GetPostSchema,
} from "@/layers/data-transfer/post/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(async (params) => {
      const post = createPost(params);
      return post;
    }),

  byId: protectedProcedure.input(GetPostSchema).query(async (params) => {
    const post = await getPostById(params);
    return post;
  }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const latestPost = await getLatestPost({ ctx });
    return latestPost;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
