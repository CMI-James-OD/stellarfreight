import { prisma } from "../lib/db/client";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@stellarfreight.local";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password_hash: await hashPassword(password),
    },
  });

  console.log(`Admin user ready: ${email}`);
  if (!process.env.ADMIN_PASSWORD) {
    console.log("Default password: ChangeMe123! - set ADMIN_PASSWORD before seeding a real environment.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
