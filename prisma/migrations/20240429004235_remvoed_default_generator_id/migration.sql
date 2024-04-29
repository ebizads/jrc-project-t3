-- AlterTable
ALTER TABLE "StatusLogs" ALTER COLUMN "generatorId" DROP DEFAULT;
DROP SEQUENCE "StatusLogs_generatorId_seq";
