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

export const addProductSchema = toTypedSchema(
  z.object({
    name: z.string({message:'Name is required'}),
    price:z.coerce.number({message:'Price is required'}),
    description:z.string({message:'Description is required'}),
    category:z.string({message:'Category is required'}),
    mainImage:z.any({message:'image is required'}),
    stock:z.coerce.number({message:'Stock is required'}),
    subImages:z.array(z.any({message:'Images is required'}))
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