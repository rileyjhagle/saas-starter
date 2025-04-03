import { createServerActionProcedure } from "zsa";
import { assertAuthenticated } from "./session";

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const user = await assertAuthenticated();
    return { user };
  },
);
