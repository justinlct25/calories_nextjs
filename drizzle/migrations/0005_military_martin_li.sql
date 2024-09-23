ALTER TABLE "attendance_record" ALTER COLUMN "status_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "attendance_record" ADD COLUMN "record" text;--> statement-breakpoint
ALTER TABLE "attendance_record" ADD COLUMN "calories" integer;