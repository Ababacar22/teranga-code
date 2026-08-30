-- AlterTable
ALTER TABLE "User" ADD COLUMN     "focusAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "lastActiveDate" TEXT,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "streakCurrent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streakLongest" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "fromScore" INTEGER,
    "toScore" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
