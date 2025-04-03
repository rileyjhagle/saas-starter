/**
 * Adds seed data to your db
 *
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaultUser = {
    email: "jakethagle@protonmail.com",
    firstName: "Jake",
    lastName: "Hagle",
  };

  const { id } = await prisma.user.create({
    data: {
      name: "Acme Co",
    },
  });

  const firstPostId = 1;
  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      name: "First Post",
      createdById: id,
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
