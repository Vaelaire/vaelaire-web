"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const interestFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Please enter your name"),
  interests: z.array(z.string()).optional(),
});

type InterestFormData = z.infer<typeof interestFormSchema>;

interface InterestFormProps {
  variant?: "inline" | "standalone";
  className?: string;
}

export function InterestForm({ variant = "inline", className }: InterestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InterestFormData>({
    resolver: zodResolver(interestFormSchema),
  });

  const onSubmit = async (data: InterestFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Interest form submission:", data);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage/20 mb-4">
          <Check className="w-6 h-6 text-sage" />
        </div>
        <h3 className="font-editorial text-display-sm text-charcoal">
          You&apos;re on the List
        </h3>
        <p className="mt-2 text-body-md text-stone">
          We&apos;ll be in touch with exclusive updates and opening details.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col sm:flex-row gap-3", className)}
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Your name"
            {...register("name")}
            className={cn(
              "w-full px-4 py-3 bg-white border text-charcoal placeholder:text-stone",
              "focus:outline-none focus:ring-2 focus:ring-champagne",
              errors.name ? "border-red-500" : "border-stone/30"
            )}
            aria-label="Your name"
            aria-invalid={!!errors.name}
          />
        </div>
        <div className="flex-1">
          <input
            type="email"
            placeholder="Your email"
            {...register("email")}
            className={cn(
              "w-full px-4 py-3 bg-white border text-charcoal placeholder:text-stone",
              "focus:outline-none focus:ring-2 focus:ring-champagne",
              errors.email ? "border-red-500" : "border-stone/30"
            )}
            aria-label="Email address"
            aria-invalid={!!errors.email}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Join the List"
          )}
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
    >
      <div>
        <label htmlFor="interest-name" className="block text-ui-sm text-charcoal mb-1">
          Your Name
        </label>
        <input
          id="interest-name"
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
        <label htmlFor="interest-email" className="block text-ui-sm text-charcoal mb-1">
          Email Address
        </label>
        <input
          id="interest-email"
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Joining...
          </span>
        ) : (
          "Join the Opening List"
        )}
      </Button>

      <p className="text-ui-sm text-stone text-center">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </form>
  );
}
