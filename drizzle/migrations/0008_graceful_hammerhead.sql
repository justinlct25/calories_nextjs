CREATE TABLE IF NOT EXISTS "activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"creator_id" integer,
	"name" text NOT NULL,
	"start_at" timestamp,
	"end_at" timestamp,
	"quota" integer,
	"price" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"icon" text DEFAULT 'default_admin.png',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "donors_to_activities" (
	"donor_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	CONSTRAINT "donors_to_activities_donor_id_activity_id_pk" PRIMARY KEY("donor_id","activity_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "donor" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"gender_option_id" integer,
	"name" text NOT NULL,
	"icon" text DEFAULT 'default_user.png',
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"phone" text,
	"weight" numeric,
	"birth" date,
	"calories" integer,
	"scores" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friend" (
	"user_1_id" text,
	"user_2_id" text,
	CONSTRAINT "friend_user_1_id_user_2_id_pk" PRIMARY KEY("user_1_id","user_2_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genderOption" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_roles" (
	"user_id" text NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "users_to_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity" ADD CONSTRAINT "activity_creator_id_admin_id_fk" FOREIGN KEY ("creator_id") REFERENCES "admin"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donors_to_activities" ADD CONSTRAINT "donors_to_activities_donor_id_donor_id_fk" FOREIGN KEY ("donor_id") REFERENCES "donor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donors_to_activities" ADD CONSTRAINT "donors_to_activities_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donor" ADD CONSTRAINT "donor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donor" ADD CONSTRAINT "donor_gender_option_id_genderOption_id_fk" FOREIGN KEY ("gender_option_id") REFERENCES "genderOption"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend" ADD CONSTRAINT "friend_user_1_id_user_id_fk" FOREIGN KEY ("user_1_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend" ADD CONSTRAINT "friend_user_2_id_user_id_fk" FOREIGN KEY ("user_2_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
