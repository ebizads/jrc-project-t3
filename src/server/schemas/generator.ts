import { z } from "zod";

export const ChangeGeneratorSettings = z.object({
    // generatorId: z.array(z.number()),
    generatorNames: z.array(
        z.object({
            id: z.number(),
            generatorName: z.string().min(1, { message: "Title cannot be empty" }).optional()
        }).optional()
    ).optional(),
    // generatorName_1: z.string().optional(),
    // generatorName_2: z.string().optional(),
    // generatorName_3: z.string().optional(),
    runningTime: z.number().optional()
})

export const CreateStatusLog = z.object({
    generatorId: z.number(),
    status_type: z.string(),
    status_msg: z.string(),
    status: z.string(),
})