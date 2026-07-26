export type LaunchMode = "prelaunch" | "live";

export const launchMode: LaunchMode =
  (process.env.NEXT_PUBLIC_VAELAIRE_SITE_MODE as LaunchMode) || "prelaunch";

export const isPrelaunch = launchMode === "prelaunch";
export const isLive = launchMode === "live";

export const launchConfig = {
  prelaunch: {
    primaryCTA: {
      label: "Join the Opening List",
      href: "#opening-list",
    },
    secondaryCTA: {
      label: "Enquire",
      href: "/contact",
    },
    bookingBar: {
      type: "interest" as const,
      heading: "Be Among the First to Stay",
      description: "Join our opening list for priority access and exclusive opening offers.",
    },
    announcement: {
      show: true,
      message: "Opening Soon — Join the List for Priority Access",
    },
  },
  live: {
    primaryCTA: {
      label: "Book Your Stay",
      href: "/book",
    },
    secondaryCTA: {
      label: "Check Availability",
      href: "/book",
    },
    bookingBar: {
      type: "booking" as const,
      heading: "Plan Your Stay",
      description: "Select dates to check availability.",
    },
    announcement: {
      show: false,
      message: "",
    },
  },
} as const;

export const currentLaunchConfig = launchConfig[launchMode];
