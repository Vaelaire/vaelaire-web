"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Please enter a message (at least 10 characters)"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submission:", data);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 bg-stone/10 px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 mb-6">
          <Check className="w-8 h-8 text-sage" />
        </div>
        <h3 className="font-editorial text-display-sm text-charcoal">
          Message Sent
        </h3>
        <p className="mt-2 text-body-md text-stone max-w-md mx-auto">
          Thank you for reaching out. We&apos;ll respond to your enquiry within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-ui-md text-midnight hover:text-champagne transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-ui-sm font-functional text-charcoal mb-2"
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={cn(
              "w-full px-4 py-3 bg-white border text-charcoal placeholder:text-stone",
              "focus:outline-none focus:ring-2 focus:ring-champagne",
              errors.name ? "border-red-500" : "border-stone/30"
            )}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-ui-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-ui-sm font-functional text-charcoal mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={cn(
              "w-full px-4 py-3 bg-white border text-charcoal placeholder:text-stone",
              "focus:outline-none focus:ring-2 focus:ring-champagne",
              errors.email ? "border-red-500" : "border-stone/30"
            )}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-ui-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-ui-sm font-functional text-charcoal mb-2"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 bg-white border border-stone/30 text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-champagne"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-ui-sm font-functional text-charcoal mb-2"
          >
            Subject *
          </label>
          <select
            id="subject"
            {...register("subject")}
            className={cn(
              "w-full px-4 py-3 bg-white border text-charcoal",
              "focus:outline-none focus:ring-2 focus:ring-champagne appearance-none",
              errors.subject ? "border-red-500" : "border-stone/30"
            )}
            aria-invalid={!!errors.subject}
          >
            <option value="">Select a subject</option>
            <option value="reservation">Reservation Enquiry</option>
            <option value="experience">Experience Booking</option>
            <option value="event">Private Event</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-ui-sm text-red-600" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-ui-sm font-functional text-charcoal mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={cn(
            "w-full px-4 py-3 bg-white border text-charcoal placeholder:text-stone resize-none",
            "focus:outline-none focus:ring-2 focus:ring-champagne",
            errors.message ? "border-red-500" : "border-stone/30"
          )}
          placeholder="How can we help?"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-ui-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
