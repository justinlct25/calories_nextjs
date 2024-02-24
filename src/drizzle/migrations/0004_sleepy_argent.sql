ALTER TABLE "activities" ADD COLUMN "creator_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_creator_id_admins_id_fk" FOREIGN KEY ("creator_id") REFERENCES "admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
