import { z } from "zod";

export const ChangeUserPass = z.object({
    id: z.number().optional(),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{1,}$/,
            {
                // message: "Password does not match the given restrictions",
                message:
                    "Password should" +
                    " include both upper and lower characters " +
                    " and at least one number or symbol",
            }
        )
        .min(12, { message: "Password should be at least 12 characters" })
        .max(20, { message: "Password should not be more than 20 characters" }),
    // oldPassword: z.string().nullish().optional(),
    oldPassword: z.array(z.string()).optional().default([]),
    currentPassword: z.string().nullish().optional(),
    confirmPassword: z.string().nullish().optional(),
    passwordAge: z.date().nullish().optional(),
    firstLogin: z.boolean().nullish().optional(),
    verified: z.date().nullish().optional(),
});
