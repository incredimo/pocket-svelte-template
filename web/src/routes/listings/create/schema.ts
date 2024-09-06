/// .\src\routes\listings\create\schema.ts
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  qty: z.number().nonnegative(),
  tags: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional(),
  location: z.object({
    id: z.string(),
    short_text: z.string().optional(),
  }),
  preferences: z.array(z.object({
    id: z.string(),
    short_text: z.string().optional(),
  })).optional(),
  unit: z.object({
    id: z.string(),
    short_text: z.string().optional(),
  }).optional(),
  category: z.object({
    id: z.string(),
    name: z.string().optional(),
  }).optional()
});

export type FormSchema = typeof formSchema;
