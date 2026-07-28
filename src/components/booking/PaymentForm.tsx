"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  confirmationNumber: string;
  totalAmount: number;
  currency: string;
  guestEmail: string;
  onSuccess: () => void;
}

export function PaymentForm({ confirmationNumber, totalAmount, currency, guestEmail, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatAmount = (amount: number, curr: string) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: curr }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Payment failed");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/book/confirmation/${confirmationNumber}`,
        payment_method_data: {
          billing_details: { email: guestEmail },
        },
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setIsProcessing(false);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-stone/10 px-4 py-3 flex justify-between items-center">
        <span className="text-body-sm text-stone">Amount due</span>
        <span className="font-editorial text-display-xs text-charcoal">
          {formatAmount(totalAmount, currency)}
        </span>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          fields: { billingDetails: { email: "never" } },
        }}
      />

      {error && (
        <p className="text-red-600 text-body-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-midnight text-ivory py-4 px-6 font-medium text-ui-md tracking-wide hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay ${formatAmount(totalAmount, currency)}`
        )}
      </button>

      <p className="text-center text-ui-xs text-stone">
        Secured by Stripe. Your payment details are encrypted.
      </p>
    </form>
  );
}
