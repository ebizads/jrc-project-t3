/*
  Warnings:

  - A unique constraint covering the columns `[generatorName]` on the table `Generator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `generatorName` to the `StatusLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generator" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "StatusLogs" ADD COLUMN     "generatorName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Generator_generatorName_key" ON "Generator"("generatorName");

-- AddForeignKey
ALTER TABLE "StatusLogs" ADD CONSTRAINT "StatusLogs_generatorName_fkey" FOREIGN KEY ("generatorName") REFERENCES "Generator"("generatorName") ON DELETE RESTRICT ON UPDATE CASCADE;
