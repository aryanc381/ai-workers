ALTER TABLE "User" ADD COLUMN "token" TEXT;

CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
