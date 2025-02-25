import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";


export const loginSchema = toTypedSchema(
    z.object({
        username: z.string(),
        password: z.string().min(6),
    })
)

export const registerSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(6),
        username: z.string().min(2),
        role: z.enum(["USER", "ADMIN"]),
    })
)

export const addCategorySchema = toTypedSchema(
    z.object({
        name:z.string()
    })
)


export type LoginSchema = {
    username: string;
    password: string;
}

export type RegisterSchema = {
    email: string;
    password: string;
    username: string;
    role: "USER" | "ADMIN";
}