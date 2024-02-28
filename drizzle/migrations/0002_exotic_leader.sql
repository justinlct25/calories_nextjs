CREATE TABLE IF NOT EXISTS "friends" (
	"user_1_id" integer,
	"user_2_id" integer,
	CONSTRAINT "friends_user_1_id_user_2_id_pk" PRIMARY KEY("user_1_id","user_2_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genderOptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender_option_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_gender_option_id_genderOptions_id_fk" FOREIGN KEY ("gender_option_id") REFERENCES "genderOptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_user_1_id_users_id_fk" FOREIGN KEY ("user_1_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_user_2_id_users_id_fk" FOREIGN KEY ("user_2_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
