import { describe, it, expect } from "vitest";
import jsonResponse from "./jsonResponse.js";

describe("jsonResponse", () => {
  it("wraps a status code and body into the expected shape", () => {
    expect(jsonResponse(200, { hello: "world" })).toEqual({
      statuscode: 200,
      body: { hello: "world" },
    });
  });

  it("keeps the body reference as-is, whatever type it is", () => {
    const body = { error: "Ocurrió un problema" };
    expect(jsonResponse(500, body).body).toBe(body);
  });
});
