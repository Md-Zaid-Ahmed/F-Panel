import * as z from "zod";

export const shopSchema = z.object({
  shopname: z
    .string()
    .min(2, "Shop name must be at least 2 characters")
    .max(25),

  ownername: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .max(25),

  phonenumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Phone number must be exactly 10 digits",
  }),

  area: z.string().min(3).max(10),

  key: z.string().min(1),
});
