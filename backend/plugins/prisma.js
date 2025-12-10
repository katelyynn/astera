import fp from "fastify-plugin";
import pkg from "@prisma/client";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

export default fp(async server => {
  server.decorate("prisma", prisma);
  server.addHook("onClose", async server => {
    await server.prisma.$disconnect();
  });
});
