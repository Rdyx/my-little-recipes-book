import { expect, test } from "vitest";

// Example UT
test("test slug", () => {
  const expectedSlug = "test-test";
  expect(getSlug("Test Test")).toBe(expectedSlug);
});
