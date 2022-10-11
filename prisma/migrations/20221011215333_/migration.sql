-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "ticketEmailed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "venmoId" DROP DEFAULT;
