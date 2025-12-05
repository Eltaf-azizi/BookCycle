// Test setup file - simplified to avoid compilation errors
// This file will be enhanced when testing dependencies are installed

// Mock window.matchMedia if it doesn't exist
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}

// Mock localStorage if it doesn't exist
if (typeof window !== 'undefined' && !window.localStorage) {
  const localStorageMock = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
}

// Mock IntersectionObserver if it doesn't exist
if (typeof window !== 'undefined' && !(window as any).IntersectionObserver) {
  (window as any).IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  };
}

console.log('Test setup completed - basic mocks initialized');