import { z } from "zod";

export const CreateStatusLog = z.object({
    status_type: z.string(),
    status_msg: z.string(),
    status: z.string(),
})