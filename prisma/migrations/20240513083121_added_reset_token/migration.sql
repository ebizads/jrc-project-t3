-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_until" TIMESTAMP(3);
