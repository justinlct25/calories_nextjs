import { db } from "@/lib/db"
import { activities } from "../schemas/activities.schema"
import { eq, desc, and } from "drizzle-orm"
import { activityStatus } from "../schemas/activity-status.schema"
import { isAdminRole } from "./users-to-roles.query"
import { donorsToActivities } from "../schemas/donors-to-activities.schema"

export const getAllActivities = async () => {
    const activities = db.query.activities.findMany()
    return activities;
}

export const getAllBriefActivities = async (isAdmin: boolean) => {
    const result = await db.query.activities.findMany({
        columns: {
            id: true,
            name: true,
            thumbnail: true,
            public: true,
            closed: true,
            startAt: true,
            endAt: true
        },
        where: isAdmin ? undefined : (activities, { eq }) => eq(activities.public, true),
        with: {
            status: true
        },
        orderBy: (activities, { desc }) => desc(activities.startAt)
    });
    return result;
}

export const getActivitiesList = async (donorId: number | null, isAdmin: boolean = false) => {
    try {
        const result = await db.select({
            ...activities,
            status: activityStatus,
            participated: donorsToActivities,
        })
            .from(activities)
            .leftJoin(activityStatus, eq(activities.statusId, activityStatus.id))
            .leftJoin(donorsToActivities, and(eq(activities.id, donorsToActivities.activityId), eq(donorsToActivities.donorId, donorId))) // if donorId is null, participated will be null as well
            .where(isAdmin ? undefined : eq(activities.public, true)) // only admin can see all activities including private ones
            .orderBy(desc(activities.startAt));

        return result;
    } catch(error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

export const getActivityById = async (activityId: number) => {

    const activity = await db.query.activities.findFirst({
        where: (activities, { eq }) => eq(activities.id, activityId),
        with: {
            status: true
        }
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
    try {
        return await db.insert(activities).values({
            ...activity,
        }).returning().then((res: any) => res[0] ?? null);
    } catch(error) {
        throw new Error(`${error}`)
    }
}

export const updateActivity = async (activityId: number, updateObj: any) => {
    try {
        await db.update(activities).set(updateObj).where(eq(activities.id, activityId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}

export const updateActivityPublicity = async (activityId: number, isPublic: boolean) => {
    try {
        await db.update(activities).set({public: isPublic}).where(eq(activities.id, activityId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}

export const updateActivityClosed = async (activityId: number, closed: boolean) => {
    try {
        await db.update(activities).set({closed: closed}).where(eq(activities.id, activityId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}

export const updateActivityStatus = async (activityId: number, statusId: number) => {
    try {
        await db.update(activities).set({statusId: statusId}).where(eq(activities.id, activityId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}