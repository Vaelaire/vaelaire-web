import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Launch mode configuration", () => {
  const originalEnv = process.env.NEXT_PUBLIC_VAELAIRE_SITE_MODE;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_VAELAIRE_SITE_MODE = originalEnv;
  });

  it("defaults to prelaunch mode", async () => {
    delete process.env.NEXT_PUBLIC_VAELAIRE_SITE_MODE;
    const launchModule = await import("./launch-mode");

    expect(launchModule.launchMode).toBe("prelaunch");
    expect(launchModule.isPrelaunch).toBe(true);
    expect(launchModule.isLive).toBe(false);
  });

  it("provides correct CTA config for prelaunch", async () => {
    process.env.NEXT_PUBLIC_VAELAIRE_SITE_MODE = "prelaunch";
    const launchModule = await import("./launch-mode");

    expect(launchModule.currentLaunchConfig.primaryCTA.label).toBe("Join the Opening List");
    expect(launchModule.currentLaunchConfig.bookingBar.type).toBe("interest");
  });

  it("provides correct CTA config for live mode", async () => {
    process.env.NEXT_PUBLIC_VAELAIRE_SITE_MODE = "live";
    const launchModule = await import("./launch-mode");

    expect(launchModule.launchMode).toBe("live");
    expect(launchModule.launchConfig.live.primaryCTA.label).toBe("Book Your Stay");
    expect(launchModule.launchConfig.live.bookingBar.type).toBe("booking");
  });
});
