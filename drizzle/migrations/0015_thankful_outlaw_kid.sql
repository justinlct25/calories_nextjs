ALTER TABLE "donor" ALTER COLUMN "icon" SET DEFAULT 'default_donor_icon.png';--> statement-breakpoint
ALTER TABLE "donor" ADD COLUMN "background" text DEFAULT 'default_donor_bg.jpg';--> statement-breakpoint
ALTER TABLE "donor" ADD COLUMN "levels" integer DEFAULT 1;