/// <reference types="vitest" />

// Vitest globals
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const test: (name: string, fn: () => void) => void;
declare const expect: (actual: any) => {
  toBe(expected: any): void;
  toHaveLength(length: number): void;
  toBeDefined(): void;
  toContain(item: any): void;
  toBeInstanceOf(type: any): void;
};