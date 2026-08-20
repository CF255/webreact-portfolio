import { describe, it, expect } from "vitest";
import isOwner from "./isOwner.js";

describe("isOwner", () => {
  it("returns true when both ids are the same string", () => {
    expect(isOwner("abc123", "abc123")).toBe(true);
  });

  it("returns false when the ids are different (prevents editing/deleting another user's resource)", () => {
    expect(isOwner("abc123", "someone-else")).toBe(false);
  });

  it("compares ids via toString, so it also works with ObjectId-like objects", () => {
    const objectIdLike = { toString: () => "abc123" };
    expect(isOwner(objectIdLike, "abc123")).toBe(true);
  });

  it("returns false when either id is missing", () => {
    expect(isOwner(null, "abc123")).toBe(false);
    expect(isOwner("abc123", undefined)).toBe(false);
    expect(isOwner(null, null)).toBe(false);
  });
});
