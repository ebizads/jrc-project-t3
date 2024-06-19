/*
  Warnings:

  - You are about to drop the column `dataVersion` on the `StatusLogs` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `StatusLogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StatusLogs" DROP CONSTRAINT "StatusLogs_uid_fkey";

-- AlterTable
ALTER TABLE "StatusLogs" DROP COLUMN "dataVersion",
DROP COLUMN "uid";
