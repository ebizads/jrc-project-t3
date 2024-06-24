/*
  Warnings:

  - Added the required column `generatorId` to the `GeneratorStatuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneratorStatuses" ADD COLUMN     "generatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GeneratorStatuses" ADD CONSTRAINT "GeneratorStatuses_generatorId_fkey" FOREIGN KEY ("generatorId") REFERENCES "Generator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
