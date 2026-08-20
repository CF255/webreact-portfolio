import { describe, it, expect } from "vitest";
import { generateAccessToken, generateRefreshToken } from "./generateTokens.js";
import { verifyAccessToken, verifyRefreshToken } from "./verifyTokens.js";

const user = { id: "123", username: "qatest", name: "QA Test" };

describe("access/refresh tokens", () => {
  it("round-trips a user payload through an access token", () => {
    const token = generateAccessToken(user);
    const decoded = verifyAccessToken(token);
    expect(decoded.user).toEqual(user);
  });

  it("round-trips a user payload through a refresh token", () => {
    const token = generateRefreshToken(user);
    const decoded = verifyRefreshToken(token);
    expect(decoded.user).toEqual(user);
  });

  it("rejects a tampered/invalid access token", () => {
    const token = generateAccessToken(user);
    expect(() => verifyAccessToken(token + "tampered")).toThrow();
  });

  it("does not accept an access token as a refresh token (different secrets)", () => {
    const accessToken = generateAccessToken(user);
    expect(() => verifyRefreshToken(accessToken)).toThrow();
  });
});
