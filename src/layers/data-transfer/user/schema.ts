import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  showEmail: z.boolean().default(true),
  bio: z.string().nullable(),
});
