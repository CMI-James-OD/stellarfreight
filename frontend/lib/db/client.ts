import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  // Prisma 7 requires a driver adapter — datasource URL is no longer read from schema.prisma.
  // Falls back to a local default so the module can be bundled; at runtime DATABASE_URL must be set.
  const connectionString =
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/stellarfreight?schema=public";

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
