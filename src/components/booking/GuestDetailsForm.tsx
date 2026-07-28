"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const guestFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  specialRequests: z.string().optional(),
  marketingOptIn: z.boolean(),
});

export type GuestFormData = z.infer<typeof guestFormSchema>;

interface GuestDetailsFormProps {
  onSubmit: (data: GuestFormData) => Promise<void>;
  onBack?: () => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<GuestFormData>;
  submitLabel?: string;
}

export function GuestDetailsForm({
  onSubmit,
  onBack,
  isSubmitting = false,
  defaultValues,
  submitLabel = "Continue to Review",
}: GuestDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
      marketingOptIn: false,
      ...defaultValues,
    },
  });

  const inputClasses = cn(
    "w-full px-4 py-3 border text-charcoal",
    "focus:outline-none focus:ring-2 focus:ring-champagne",
    "placeholder:text-stone"
  );

  const labelClasses = "block text-ui-sm text-charcoal mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            {...register("firstName")}
            className={cn(
              inputClasses,
              errors.firstName ? "border-red-500" : "border-stone/30"
            )}
          />
          {errors.firstName && (
            <p className="mt-1 text-ui-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Smith"
            {...register("lastName")}
            className={cn(
              inputClasses,
              errors.lastName ? "border-red-500" : "border-stone/30"
            )}
          />
          {errors.lastName && (
            <p className="mt-1 text-ui-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="john.smith@email.com"
            {...register("email")}
            className={cn(
              inputClasses,
              errors.email ? "border-red-500" : "border-stone/30"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-ui-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number <span className="text-stone">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+351 912 345 678"
            {...register("phone")}
            className={cn(inputClasses, "border-stone/30")}
          />
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label htmlFor="specialRequests" className={labelClasses}>
          Special Requests <span className="text-stone">(Optional)</span>
        </label>
        <textarea
          id="specialRequests"
          rows={4}
          placeholder="Let us know if you have any special requests or requirements..."
          {...register("specialRequests")}
          className={cn(inputClasses, "border-stone/30 resize-none")}
        />
      </div>

      {/* Marketing Opt-in */}
      <div className="flex items-start gap-3">
        <input
          id="marketingOptIn"
          type="checkbox"
          {...register("marketingOptIn")}
          className="mt-1 w-4 h-4 border-stone/30 text-midnight focus:ring-champagne"
        />
        <label htmlFor="marketingOptIn" className="text-body-sm text-stone">
          I would like to receive news and special offers from Vaelaire. You can
          unsubscribe at any time.
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
        {onBack && (
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
            className="flex-1 sm:flex-initial"
          >
            Back
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 sm:flex-initial sm:ml-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
