CREATE TABLE "twoFactors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"secret" text,
	"backupCodes" text
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "twoFactorEnabled" boolean;--> statement-breakpoint
ALTER TABLE "twoFactors" ADD CONSTRAINT "twoFactors_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;