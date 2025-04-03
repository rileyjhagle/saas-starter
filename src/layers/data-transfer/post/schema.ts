import { z } from "zod";

export const GetPostSchema = z.object({ id: z.number() });

export const CreatePostSchema = z.object({
  name: z.string(),
});
