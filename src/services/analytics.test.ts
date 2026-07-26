import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Analytics service", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.resetModules();
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("tracks events when enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "true");

    const { ConsoleAnalyticsAdapter } = await import("./analytics");
    const adapter = new ConsoleAnalyticsAdapter();
    adapter.track({ name: "page_view", data: { path: "/" } });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] Track:",
      "page_view",
      { path: "/" }
    );
  });

  it("does not track events when disabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "false");

    const { ConsoleAnalyticsAdapter } = await import("./analytics");
    const adapter = new ConsoleAnalyticsAdapter();
    adapter.track({ name: "page_view", data: { path: "/" } });

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("identifies users when enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "true");

    const { ConsoleAnalyticsAdapter } = await import("./analytics");
    const adapter = new ConsoleAnalyticsAdapter();
    adapter.identify("user-123", { name: "Test User" });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] Identify:",
      "user-123",
      { name: "Test User" }
    );
  });

  it("tracks page views when enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "true");

    const { ConsoleAnalyticsAdapter } = await import("./analytics");
    const adapter = new ConsoleAnalyticsAdapter();
    adapter.page("Home", { path: "/" });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] Page:",
      "Home",
      { path: "/" }
    );
  });
});
