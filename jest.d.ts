// Jest global type declarations
// This file provides types for Jest globals until dependencies are fully installed

declare namespace jest {
  function fn<T extends (...args: any[]) => any>(implementation?: T): jest.Mock<ReturnType<T>, Parameters<T>>;
  interface Mock<T = any, Y extends any[] = any> {
    (...args: Y): T;
    mock: MockContext<T, Y>;
    mockClear(): this;
    mockReset(): this;
    mockRestore(): void;
    mockImplementation(fn: (...args: Y) => T): this;
    mockImplementationOnce(fn: (...args: Y) => T): this;
    mockReturnThis(): this;
    mockReturnValue(value: T): this;
    mockReturnValueOnce(value: T): this;
    mockResolvedValue(value: Awaited<T>): this;
    mockResolvedValueOnce(value: Awaited<T>): this;
    mockRejectedValue(value: any): this;
    mockRejectedValueOnce(value: any): this;
  }
  interface MockContext<T, Y extends any[]> {
    calls: Y[];
    results: Array<{ type: 'return' | 'throw'; value: T | any }>;
  }
}

declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void | Promise<void>): void;
declare function test(name: string, fn: () => void | Promise<void>): void;
declare function expect<T = any>(actual: T): Matchers<T>;
declare function beforeEach(fn: () => void | Promise<void>): void;
declare function afterEach(fn: () => void | Promise<void>): void;
declare function beforeAll(fn: () => void | Promise<void>): void;
declare function afterAll(fn: () => void | Promise<void>): void;

interface Matchers<T> {
  toBe(expected: T): void;
  toEqual(expected: T): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeNull(): void;
  toBeUndefined(): void;
  toBeDefined(): void;
  toContain(item: any): void;
  toHaveLength(length: number): void;
  toHaveBeenCalled(): void;
  toHaveBeenCalledTimes(times: number): void;
  toHaveBeenCalledWith(...args: any[]): void;
  toThrow(error?: string | Error | RegExp): void;
  toBeGreaterThan(value: number): void;
  toBeLessThan(value: number): void;
  toBeGreaterThanOrEqual(value: number): void;
  toBeLessThanOrEqual(value: number): void;
  not: Matchers<T>;
}
