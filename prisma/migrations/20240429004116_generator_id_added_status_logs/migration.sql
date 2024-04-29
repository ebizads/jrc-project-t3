/*
  Warnings:

  - You are about to drop the column `generatorName` on the `StatusLogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StatusLogs" DROP CONSTRAINT "StatusLogs_generatorName_fkey";

-- AlterTable
ALTER TABLE "StatusLogs" DROP COLUMN "generatorName",
ADD COLUMN     "generatorId" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "StatusLogs" ADD CONSTRAINT "StatusLogs_generatorId_fkey" FOREIGN KEY ("generatorId") REFERENCES "Generator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
