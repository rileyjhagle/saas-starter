import { createServerActionProcedure } from "zsa";

export const unprotectedAction = createServerActionProcedure().handler(
  async () => {
    return {};
  },
);
