-- CreateTable
CREATE TABLE "GeneratorStatuses" (
    "id" SERIAL NOT NULL,
    "status_name" TEXT,
    "current_status" TEXT,

    CONSTRAINT "GeneratorStatuses_pkey" PRIMARY KEY ("id")
);
