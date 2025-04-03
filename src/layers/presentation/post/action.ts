"use server";
import { createPostUseCase, getPostUseCase } from "@/layers/use-cases/post";
import {
  CreatePostSchema,
  GetPostSchema,
} from "@/layers/data-transfer/post/schema";
import { authenticatedAction } from "@/lib/safe-action";
//Next JS Specific functionality.
//Handle reloading the ui after updates

// Setup a new authenticated server action
export const createPostAction = authenticatedAction
  .createServerAction()
  // The action should take the same schema input as the form schema
  // This ensures we have type safety from the frontend to the backend
  .input(CreatePostSchema)
  // The logic of taking form input data and sending it off to our business logic
  // to decide if we have the right permissions and information to create a form
  .handler(async ({ input, ctx }) => {
    // Call the business logic/use case layer to handle create the post
    await createPostUseCase(ctx.user, input);
  });

export const getPostAction = authenticatedAction
  .createServerAction()
  .input(GetPostSchema)
  .handler(async ({ input, ctx }) => {
    // Call the business logic/use case layer to handle create the post
    const post = await getPostUseCase(ctx.user, input);
    return post;
  });
