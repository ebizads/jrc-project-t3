import { z } from "zod";
export const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }).trim(),
    password: z
        .string()
        .min(1, { message: "The password is invalid" })
        .max(20, { message: "The password is invalid" }),
});

export const ChangeUserPass = z.object({
    id: z.number().optional(),
    password: z
        .string()
        .min(1, { message: "New Password required" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{1,}$/),
    // .max(20, { message: "Password should not be more than 20 characters" }),
    // oldPassword: z.string().nullish().optional(),
    oldPassword: z.array(z.string()).optional().default([]),
    currentPassword: z.string()
        .min(1, { message: "Old Password is required" }),
    confirmPassword: z.string()
        .min(1, { message: "Confirm Password is required" }),
});
