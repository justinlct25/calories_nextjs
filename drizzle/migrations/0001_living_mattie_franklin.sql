CREATE TABLE IF NOT EXISTS "participant_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"phone" text NOT NULL,
	"weight" integer NOT NULL,
	"birth" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "donors_to_activities" ADD COLUMN "participant_info_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donors_to_activities" ADD CONSTRAINT "donors_to_activities_participant_info_id_participant_info_id_fk" FOREIGN KEY ("participant_info_id") REFERENCES "participant_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
