import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

/**
 * Phone validation schema (optional, international format)
 */
export const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(val),
    "Please enter a valid phone number"
  );

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters");

/**
 * Date validation helpers
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function isDateInFuture(date: Date): boolean {
  return isValidDate(date) && date > new Date();
}

export function isCheckOutAfterCheckIn(checkIn: Date, checkOut: Date): boolean {
  return isValidDate(checkIn) && isValidDate(checkOut) && checkOut > checkIn;
}

/**
 * Booking dates validation schema
 */
export const bookingDatesSchema = z
  .object({
    checkIn: z.date().refine(isDateInFuture, "Check-in must be in the future"),
    checkOut: z.date(),
  })
  .refine((data) => isCheckOutAfterCheckIn(data.checkIn, data.checkOut), {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

/**
 * Guest count validation
 */
export const guestCountSchema = z
  .number()
  .int()
  .min(1, "At least 1 guest required")
  .max(10, "Maximum 10 guests");

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
});

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * Interest/opening list schema
 */
export const interestFormSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  interests: z.array(z.string()).optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type InterestFormData = z.infer<typeof interestFormSchema>;
