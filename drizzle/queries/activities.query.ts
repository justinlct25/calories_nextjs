import { db } from "@/lib/db"
import { activities } from "../schemas/activities.schema"
import { eq } from "drizzle-orm"

export const getAllActivities = async () => {
    const activities = db.query.activities.findMany()
    return activities;
}

export const getAllBriefActivities = async () => {
    const result = await db.selectDistinct({id: activities.id, name: activities.name, thumbnail: activities.thumbnail, startAt: activities.startAt, endAt: activities.endAt}).from(activities)
    return result;
}

export const getActivityById = async (activityId: number) => {
    const activity = db.query.activities.findFirst({
        where: (activities, { eq }) => eq(activities.id, activityId),
        // with: {
        //     participants: true
        // }
    })
    return activity;
}

export const getActivityByName = async (name: string) => {
    const activity = db.query.activities.findFirst({
        where: (activities, { eq }) => eq(activities.name, name)
    })
    return activity;
}

type NewActivity = typeof activities.$inferInsert
export const insertActivity = async (activity: NewActivity) => {
    console.log("activity insert:")
    console.log(activity)
    try {
        return await db.insert(activities).values({
            ...activity,
        }).returning().then((res) => res[0] ?? null);
    } catch(error) {
        throw new Error(`${error}`)
    }
}

export const updateActivity = async (activityId: number, updateObj: any) => {
    console.log(activityId)
    console.log(updateObj)
    try {
        await db.update(activities).set(updateObj).where(eq(activities.id, activityId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}