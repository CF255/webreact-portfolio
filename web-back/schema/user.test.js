import { describe, it, expect } from "vitest";
import bcrypt from "bcrypt";
import User from "./user.js";

describe("User.isCorrectPassword", () => {
  it("returns true for the correct password against its hash", async () => {
    const hash = await bcrypt.hash("s3cret123", 10);
    const user = new User({ username: "qatest", name: "QA Test", password: hash });

    await expect(user.isCorrectPassword("s3cret123", hash)).resolves.toBe(true);
  });

  it("returns false for a wrong password", async () => {
    const hash = await bcrypt.hash("s3cret123", 10);
    const user = new User({ username: "qatest", name: "QA Test", password: hash });

    await expect(user.isCorrectPassword("wrong-password", hash)).resolves.toBe(false);
  });
});
