"use client";

import Image from "next/image";
import Link from "next/link";

type LogoVariant = "primary" | "horizontal" | "monogram" | "white" | "black";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  width?: number;
  height?: number;
  linkToHome?: boolean;
}

const logoSources: Record<LogoVariant, string> = {
  primary: "/brand/Vaelaire_Logo_Primary.svg",
  horizontal: "/brand/Vaelaire_Logo_Horizontal.svg",
  monogram: "/brand/Vaelaire_Logo_Monogram.svg",
  white: "/brand/Vaelaire_Logo_White.svg",
  black: "/brand/Vaelaire_Logo_Black.svg",
};

const defaultDimensions: Record<LogoVariant, { width: number; height: number }> = {
  primary: { width: 180, height: 80 },
  horizontal: { width: 200, height: 40 },
  monogram: { width: 48, height: 48 },
  white: { width: 180, height: 80 },
  black: { width: 180, height: 80 },
};

export function Logo({
  variant = "horizontal",
  className = "",
  width,
  height,
  linkToHome = true,
}: LogoProps) {
  const dimensions = {
    width: width ?? defaultDimensions[variant].width,
    height: height ?? defaultDimensions[variant].height,
  };

  const logoImage = (
    <Image
      src={logoSources[variant]}
      alt="Vaelaire"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority
    />
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
