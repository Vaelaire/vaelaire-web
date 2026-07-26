export interface NewsletterSubscription {
  email: string;
  name?: string;
  source?: "footer" | "opening-list" | "inline";
  interests?: string[];
}

export interface SubscriptionResult {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

export interface NewsletterService {
  subscribe(data: NewsletterSubscription): Promise<SubscriptionResult>;
  unsubscribe(email: string): Promise<SubscriptionResult>;
}

/**
 * Mock newsletter service for development.
 * Replace with a real email service integration (e.g., Mailchimp, ConvertKit, Resend)
 */
export class MockNewsletterService implements NewsletterService {
  private readonly mockDelay = 500;
  private readonly subscribers = new Set<string>();

  async subscribe(data: NewsletterSubscription): Promise<SubscriptionResult> {
    await this.delay();

    if (this.subscribers.has(data.email)) {
      return {
        success: true,
        message: "You're already subscribed!",
        alreadySubscribed: true,
      };
    }

    this.subscribers.add(data.email);

    console.log("Newsletter subscription:", {
      ...data,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Thank you for subscribing!",
    };
  }

  async unsubscribe(email: string): Promise<SubscriptionResult> {
    await this.delay();

    if (!this.subscribers.has(email)) {
      return {
        success: false,
        message: "Email not found in our list.",
      };
    }

    this.subscribers.delete(email);

    console.log("Newsletter unsubscription:", {
      email,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: "You have been unsubscribed.",
    };
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.mockDelay));
  }
}

// Singleton instance
let newsletterService: NewsletterService | null = null;

export function getNewsletterService(): NewsletterService {
  if (!newsletterService) {
    newsletterService = new MockNewsletterService();
  }
  return newsletterService;
}
