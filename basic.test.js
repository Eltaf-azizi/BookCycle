import { describe, it, expect, test } from 'vitest';

console.log('Testing vitest imports...');
console.log('describe:', typeof describe);
console.log('it:', typeof it);
console.log('expect:', typeof expect);

describe('Basic Test Suite', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });

  test('should also work', () => {
    expect(2 + 2).toBe(4);
  });
});

console.log('Test file loaded successfully');