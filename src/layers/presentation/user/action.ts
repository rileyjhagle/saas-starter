"use server";
import { updateUserUseCase } from "@/layers/use-cases/user";
import { UpdateUserSchema } from "@/layers/data-transfer/user/schema";
import { authenticatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/server/auth";
import { unprotectedAction } from "@/lib/unprotected-action";

//Next JS Specific functionality.
//Handle reloading the ui after updates
export const updateUserAction = authenticatedAction
  .createServerAction()
  .input(UpdateUserSchema)
  .handler(async ({ input, ctx }) => {
    await updateUserUseCase(ctx.user, input);

    revalidatePath(`/settings`);
  });

export const signOutAction = authenticatedAction
  .createServerAction()
  .handler(async ({}) => {
    await signOut({ redirect: true, redirectTo: "/" });
  });

export const signInAction = unprotectedAction
  .createServerAction()
  .handler(async ({}) => {
    await signIn("discord");
  });
