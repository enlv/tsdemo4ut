import { describe, it, expect, beforeEach, vi } from 'vitest';
import { add, divide, isPalindrome, findMaxAndIndex } from './evaluation';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should add two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should add a positive and a negative number', () => {
    expect(add(2, -3)).toBe(-1);
  });

  it('should add zero', () => {
    expect(add(2, 0)).toBe(2);
  });
});

describe('divide', () => {
  it('should divide two positive numbers', () => {
    expect(divide(6, 3)).toBe(2);
  });

  it('should divide two negative numbers', () => {
    expect(divide(-6, -3)).toBe(2);
  });

  it('should divide a positive and a negative number', () => {
    expect(divide(6, -3)).toBe(-2);
  });

  it('should return Infinity when dividing by zero', () => {
    expect(divide(6, 0)).toBe(Infinity);
  });

  it('should return NaN when zero is divided by zero', () => {
    expect(divide(0, 0)).toBeNaN();
  });
});

describe('isPalindrome', () => {
  it('should return true for a simple palindrome', () => {
    expect(isPalindrome('madam')).toBe(true);
  });

  it('should return false for a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  it('should return true for a palindrome with mixed case and spaces', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
  });

  it('should return true for a palindrome with punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  it('should return true for an empty string', () => {
    expect(isPalindrome('')).toBe(true);
  });
});

describe('findMaxAndIndex', () => {
  it('should return null for an empty array', () => {
    expect(findMaxAndIndex([])).toBeNull();
  });

  it('should find the max and index in an array of positive numbers', () => {
    expect(findMaxAndIndex([1, 3, 2])).toEqual({ max: 3, index: 1 });
  });

  it('should find the max and index in an array of negative numbers', () => {
    expect(findMaxAndIndex([-1, -3, -2])).toEqual({ max: -1, index: 0 });
  });

  it('should find the max and index in an array with duplicates', () => {
    expect(findMaxAndIndex([1, 3, 3, 2])).toEqual({ max: 3, index: 1 });
  });

  it('should find the max and index in an array with a single element', () => {
    expect(findMaxAndIndex([7])).toEqual({ max: 7, index: 0 });
  });
});
