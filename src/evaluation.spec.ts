import { describe, it, expect } from "vitest";
import { add, divide, isPalindrome, findMaxAndIndex } from "./evaluation";

describe("add", () => {
  it("should return the sum of two numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, -1)).toBe(-2);
    expect(add(-1, 1)).toBe(0);
  });
});

describe("divide", () => {
  it("should return the division of two numbers", () => {
    expect(divide(4, 2)).toBe(2);
    expect(divide(1, 4)).toBe(0.25);
  });

  it("should handle division by zero", () => {
    expect(divide(1, 0)).toBe(Infinity);
    expect(divide(-1, 0)).toBe(-Infinity);
  });
});

describe("isPalindrome", () => {
  it("should return true for a palindrome", () => {
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    expect(isPalindrome("racecar")).toBe(true);
  });

  it("should return false for a non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
    expect(isPalindrome("world")).toBe(false);
  });
});

describe("findMaxAndIndex", () => {
  it("should return the max value and its index", () => {
    expect(findMaxAndIndex([1, 3, 2])).toEqual({ max: 3, index: 1 });
    expect(findMaxAndIndex([5, 5, 5])).toEqual({ max: 5, index: 0 });
  });

  it("should return null for an empty array", () => {
    expect(findMaxAndIndex([])).toBeNull();
  });

  it("should handle arrays with negative numbers", () => {
    expect(findMaxAndIndex([-1, -3, -2])).toEqual({ max: -1, index: 0 });
  });
});
