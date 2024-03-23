import { db } from "@/lib/db"
import { activities } from "../schemas/activities.schema"
import { eq } from "drizzle-orm"

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
    try {
        return await db.insert(activities).values({
            ...activity,
        }).returning().then((res) => res[0] ?? null);
    } catch(error) {
        throw new Error(`${error}`)
    }
}

export const updateActivity = async (activityId: number, updateObj: any) => {
    try {
        return await db.update(activities).set(updateObj).where(eq(activities.id, activityId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}