CREATE TABLE IF NOT EXISTS "attendance_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_id" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "public" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "donors_to_activities" ADD COLUMN "attendance_record_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donors_to_activities" ADD CONSTRAINT "donors_to_activities_attendance_record_id_attendance_record_id_fk" FOREIGN KEY ("attendance_record_id") REFERENCES "attendance_record"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance_record" ADD CONSTRAINT "attendance_record_status_id_attendance_record_id_fk" FOREIGN KEY ("status_id") REFERENCES "attendance_record"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
