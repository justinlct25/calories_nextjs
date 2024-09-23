CREATE TABLE IF NOT EXISTS "attendance_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attendance_record" DROP CONSTRAINT "attendance_record_status_id_attendance_record_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance_record" ADD CONSTRAINT "attendance_record_status_id_attendance_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "attendance_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
