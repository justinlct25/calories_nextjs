import { NextResponse } from "next/server";
import * as z from 'zod';

const activityCreateForm = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    quota: z.number(),
    price: z.number()
})

