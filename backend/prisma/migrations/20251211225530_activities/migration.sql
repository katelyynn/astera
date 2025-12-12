-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "involved" TEXT[],
    "context" JSONB,
    "type" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
