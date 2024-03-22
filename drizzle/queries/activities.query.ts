import { db } from "@/lib/db"
import { activities } from "../schemas/activities.schema"

export const getAllActivities = async () => {
    const activities = db.query.activities.findMany()
    return activities;
}

export const getActivityByName = async (name: string) => {
    const activity = db.query.activities.findFirst({
        where: (activities, { eq }) => eq(activities.name, name)
    })
    return activity;
}

type NewActivity = typeof activities.$inferInsert
export const insertActivity = async (activity: NewActivity) => {
    return await db.insert(activities).values({
        ...activity,
    }).returning().then((res) => res[0] ?? null);
}