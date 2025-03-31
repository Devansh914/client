'use client';
import {z} from "zod";

export const MoodTrackerschema = z.object({
        Mood:z.string().min(1, { message:"Mood field is required"}),
        Anxiety:z.string().min(1, { message:"Anxiety field is required"}),
        Sleephours:z.string().min(1, { message:"Sleep hours is required"}),
        exercise:z.string().min(1, { message:"Exercise field is required"}),
        plannedornot:z.boolean(),
})