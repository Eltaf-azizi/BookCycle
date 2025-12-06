const vitest = require('vitest');

const { describe, it, expect } = vitest;

describe('Basic Test Suite', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });

  it('should also work', () => {
    expect(2 + 2).toBe(4);
  });
});

console.log('CommonJS test file loaded successfully');