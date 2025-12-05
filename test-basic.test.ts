// Simple test to verify vitest is working
import { expect, describe, it } from 'vitest';

describe('Basic Test Suite', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });

  it('should handle basic math', () => {
    expect(2 + 2).toBe(4);
  });
});