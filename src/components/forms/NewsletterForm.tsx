"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: "footer" | "inline" | "standalone";
  className?: string;
}

export function NewsletterForm({ variant = "inline", className }: NewsletterFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", data);
    setIsSubmitted(true);
    reset();

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-2", className)}>
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            {...register("email")}
            className={cn(
              "flex-1 px-4 py-2.5 bg-midnight border text-ivory placeholder:text-stone/60",
              "focus:outline-none focus:ring-1 focus:ring-champagne",
              "text-body-sm",
              errors.email ? "border-red-400" : "border-stone/30"
            )}
            aria-label="Email address"
            aria-invalid={!!errors.email}
          />
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={cn(
              "px-4 py-2.5 bg-champagne text-midnight transition-all",
              "hover:bg-champagne/90 disabled:opacity-50",
              "focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-midnight"
            )}
            aria-label={isSubmitted ? "Subscribed" : "Subscribe"}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSubmitted ? (
              <Check className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.email && (
          <p className="text-ui-sm text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
        {isSubmitted && (
          <p className="text-ui-sm text-champagne" role="status">
            Thank you for subscribing!
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className={cn(
            "w-full px-4 py-3 bg-ivory border text-charcoal placeholder:text-stone",
            "focus:outline-none focus:ring-2 focus:ring-champagne",
            "text-body-md",
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
      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={cn(
          "w-full px-6 py-3 bg-midnight text-ivory font-functional text-ui-md",
          "hover:bg-charcoal transition-colors disabled:opacity-50",
          "focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2"
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Subscribing...
          </span>
        ) : isSubmitted ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Subscribed!
          </span>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
