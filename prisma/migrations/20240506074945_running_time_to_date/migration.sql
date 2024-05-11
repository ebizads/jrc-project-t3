/*
  Warnings:

  - The `runningTime` column on the `Generator` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Generator" DROP COLUMN "runningTime",
ADD COLUMN     "runningTime" TIMESTAMP(3);
