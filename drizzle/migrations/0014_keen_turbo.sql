ALTER TABLE "genderOption" RENAME TO "gender_option";--> statement-breakpoint
ALTER TABLE "donor" DROP CONSTRAINT "donor_gender_option_id_genderOption_id_fk";
--> statement-breakpoint
ALTER TABLE "donors_to_activities" DROP CONSTRAINT "donors_to_activities_donor_id_activity_id_pk";--> statement-breakpoint
ALTER TABLE "donors_to_activities" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "donor" ADD CONSTRAINT "donor_gender_option_id_gender_option_id_fk" FOREIGN KEY ("gender_option_id") REFERENCES "gender_option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
