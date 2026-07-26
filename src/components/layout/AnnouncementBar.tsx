"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { currentLaunchConfig } from "@/config/launch-mode";

interface AnnouncementBarProps {
  message?: string;
  show?: boolean;
}

export function AnnouncementBar({
  message = currentLaunchConfig.announcement.message,
  show = currentLaunchConfig.announcement.show
}: AnnouncementBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  if (!show || isDismissed || !mounted) {
    return null;
  }

  return (
    <div className="bg-midnight text-ivory py-2.5 px-4 text-center relative">
      <p className="text-ui-sm font-functional tracking-wide">
        {message}
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
