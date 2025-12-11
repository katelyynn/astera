/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_at",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
