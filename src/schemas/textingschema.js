'use client';

import {z} from 'zod';

export const Textingschema= z.object({
     text: z.string().min(1, { message:"Text is required"})
})