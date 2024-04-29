-- CreateTable
CREATE TABLE "Generator" (
    "id" SERIAL NOT NULL,
    "generatorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Generator_pkey" PRIMARY KEY ("id")
);
