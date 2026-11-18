import { z } from "zod";

/** Client-safe schemas shared by the forms and the mock server function. */
export const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid work email").max(255),
  source: z.enum(["final-cta", "signup", "login"]).default("final-cta"),
});

export const demoSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(2, "Company name is required").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number")
    .or(z.literal("")),
  teamSize: z.enum(["1-10", "11-50", "51-200", "200+"], {
    errorMap: () => ({ message: "Pick a team size" }),
  }),
  message: z.string().trim().max(1000).optional().default(""),
});

export type EmailInput = z.input<typeof emailSchema>;
export type DemoInput = z.input<typeof demoSchema>;
