import { db } from '@/lib/db'
import { activityStatus } from '../schemas/activity-status.schema'

export type ActivityStatus = typeof activityStatus.$inferInsert;
export const insertActivityStatus = async (activityStatusObj: ActivityStatus) => {
    const newActivityStatus = await db.insert(activityStatus).values(activityStatusObj).returning().then((res) => res[0] ?? null);
    return newActivityStatus;
}

export const getAllActivityStatuses = async () => {
    const activityStatuses = await db.query.activityStatus.findMany();
    return activityStatuses;
}

export const getActivityStatusByName = async (name: string) => {
    const status = await db.query.activityStatus.findFirst({
        where: (activityStatus, { eq }) => eq(activityStatus.name, name)
    })
    return status;
}
