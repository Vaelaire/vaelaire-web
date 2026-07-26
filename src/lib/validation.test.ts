import { describe, it, expect } from "vitest";
import {
  emailSchema,
  nameSchema,
  isValidDate,
  isDateInFuture,
  isCheckOutAfterCheckIn,
  newsletterSchema,
  contactFormSchema,
} from "./validation";

describe("Email validation", () => {
  it("accepts valid email addresses", () => {
    expect(emailSchema.safeParse("test@example.com").success).toBe(true);
    expect(emailSchema.safeParse("user.name@domain.co.uk").success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(emailSchema.safeParse("").success).toBe(false);
    expect(emailSchema.safeParse("notanemail").success).toBe(false);
    expect(emailSchema.safeParse("@nodomain.com").success).toBe(false);
  });
});

describe("Name validation", () => {
  it("accepts valid names", () => {
    expect(nameSchema.safeParse("John").success).toBe(true);
    expect(nameSchema.safeParse("Jane Doe").success).toBe(true);
  });

  it("rejects names that are too short", () => {
    expect(nameSchema.safeParse("J").success).toBe(false);
  });

  it("rejects names that are too long", () => {
    const longName = "a".repeat(101);
    expect(nameSchema.safeParse(longName).success).toBe(false);
  });
});

describe("Date validation helpers", () => {
  it("validates dates correctly", () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date("2024-12-01"))).toBe(true);
    expect(isValidDate(new Date("invalid"))).toBe(false);
  });

  it("checks if date is in future", () => {
    const future = new Date();
    future.setDate(future.getDate() + 1);
    expect(isDateInFuture(future)).toBe(true);

    const past = new Date();
    past.setDate(past.getDate() - 1);
    expect(isDateInFuture(past)).toBe(false);
  });

  it("validates check-out after check-in", () => {
    const checkIn = new Date("2024-12-01");
    const checkOut = new Date("2024-12-05");
    expect(isCheckOutAfterCheckIn(checkIn, checkOut)).toBe(true);

    const sameDate = new Date("2024-12-01");
    expect(isCheckOutAfterCheckIn(checkIn, sameDate)).toBe(false);

    const before = new Date("2024-11-30");
    expect(isCheckOutAfterCheckIn(checkIn, before)).toBe(false);
  });
});

describe("Newsletter schema", () => {
  it("accepts valid newsletter data", () => {
    const result = newsletterSchema.safeParse({ email: "test@example.com" });
    expect(result.success).toBe(true);
  });

  it("accepts newsletter data with optional name", () => {
    const result = newsletterSchema.safeParse({
      email: "test@example.com",
      name: "John",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = newsletterSchema.safeParse({ email: "invalid" });
    expect(result.success).toBe(false);
  });
});

describe("Contact form schema", () => {
  it("accepts valid contact form data", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      subject: "reservation",
      message: "I would like to book a room.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short messages", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      subject: "reservation",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional phone field", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "+351 123 456 789",
      subject: "reservation",
      message: "I would like to book a room for next week.",
    });
    expect(result.success).toBe(true);
  });
});
