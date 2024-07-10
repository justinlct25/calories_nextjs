ALTER TABLE "activity" ALTER COLUMN "thumbnail" SET DEFAULT 'default_activity_thumbnail.jpg';--> statement-breakpoint
ALTER TABLE "activity" ALTER COLUMN "online" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "donor" ALTER COLUMN "calories" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "donor" ALTER COLUMN "scores" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "background" text DEFAULT 'default_activity_bg.jpg';--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "public" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "closed" boolean DEFAULT false;