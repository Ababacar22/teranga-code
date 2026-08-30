-- AlterTable
ALTER TABLE "User" ADD COLUMN     "missedQuestions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
