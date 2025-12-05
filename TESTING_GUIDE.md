# BookCycle Testing Guide 🧪

## Overview

This guide covers the testing setup for the BookCycle React application. We've implemented a comprehensive testing strategy using Vitest, Testing Library, and GitHub Actions for CI/CD.

## Testing Stack

- **Vitest** - Fast unit test runner
- **Testing Library** - Component testing utilities
- **Jest DOM** - Additional matchers
- **MSW** - API mocking (to be added)
- **GitHub Actions** - CI/CD pipeline

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Code Quality Checks

```bash
# Run ESLint
npm run lint

# Check TypeScript
npm run type-check

# Check Prettier formatting
npm run format:check

# Format code with Prettier
npm run format
```

## Testing Structure

### Test Organization

```
src/
├── components/
│   ├── __tests__/           # Component tests
│   │   ├── BookCard.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   └── Header.test.tsx
│   └── [Component].tsx
├── contexts/
│   ├── __tests__/           # Context tests
│   └── AuthContext.test.tsx
├── hooks/
│   ├── __tests__/           # Hook tests
│   └── useAuth.test.tsx
├── utils/
│   ├── __tests__/           # Utility tests
│   └── searchUtils.test.ts
└── test/
    ├── setup.ts            # Test setup and globals
    └── utils.tsx           # Test utilities and mocks
```

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/utils';
import userEvent from '@testing-library/user-event';
import BookCard from './BookCard';

describe('BookCard', () => {
  it('renders book information correctly', () => {
    const mockBook = {
      id: '1',
      title: 'Test Book',
      author: 'Test Author',
      // ... other required properties
    };
    
    render(<BookCard book={mockBook} onRequest={vi.fn()} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    const mockOnRequest = vi.fn();
    
    render(<BookCard book={mockBook} onRequest={mockOnRequest} />);
    
    await user.click(screen.getByRole('button', { name: /request/i }));
    
    expect(mockOnRequest).toHaveBeenCalledWith('1');
  });
});
```

### Context Tests

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';

describe('AuthContext', () => {
  it('provides authentication state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('handles login', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

## Test Utilities

### Custom Render

Use the custom render function that includes providers:

```typescript
import { render, screen } from '../test/utils';

// Instead of:
// render(<Component />);

// Use:
// render(<Component />, { wrapper: AllTheProviders });
```

### Mock Data

Use factory functions for consistent test data:

```typescript
import { createMockBook, createMockUser } from '../test/utils';

const mockBook = createMockBook({
  title: 'Custom Title',
  condition: 'Like New',
});

const mockUser = createMockUser({
  verified: true,
  city: 'Custom City',
});
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Bad - Tests implementation details
it('calls onRequest when button is clicked', () => {
  const onRequest = vi.fn();
  render(<BookCard book={mockBook} onRequest={onRequest} />);
  
  const button = screen.getByRole('button');
  button.click();
  
  expect(onRequest).toHaveBeenCalled();
});

// ✅ Good - Tests user behavior
it('allows users to request books', async () => {
  const user = userEvent.setup();
  const onRequest = vi.fn();
  
  render(<BookCard book={mockBook} onRequest={onRequest} />);
  
  await user.click(screen.getByRole('button', { name: /I Want This Book/i }));
  
  expect(onRequest).toHaveBeenCalledWith('1');
});
```

### 2. Use Descriptive Test Names

```typescript
// ✅ Good
it('displays book title and author when component renders', () => { ... });

// ✅ Good  
it('shows "Location not specified" when no cities are provided', () => { ... });

// ✅ Good
it('handles rapid clicks without multiple requests', async () => { ... });
```

### 3. Test Edge Cases

```typescript
it('handles missing book data gracefully', () => {
  const incompleteBook = { id: '1', title: '' } as any;
  
  render(<BookCard book={incompleteBook} onRequest={vi.fn()} />);
  
  expect(screen.getByText(/location not specified/i)).toBeInTheDocument();
});
```

### 4. Mock External Dependencies

```typescript
// Mock localStorage for auth tests
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
  });
});
```

## Accessibility Testing

### Use Semantic Queries

```typescript
// ✅ Good - Uses semantic roles
expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

// ✅ Good - Uses accessible text
expect(screen.getByText(/required fields/i)).toBeInTheDocument();

// ❌ Avoid - Implementation details
expect(screen.getByTestId('submit-button')).toBeInTheDocument();
```

## Performance Testing

### Memory Leak Detection

```typescript
import { renderHook, act } from '@testing-library/react';

it('does not cause memory leaks', () => {
  const { unmount } = renderHook(() => useAuth());
  
  unmount();
  
  // Should not throw errors
  expect(() => act(() => {})).not.toThrow();
});
```

## Coverage Goals

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 75%
- **Statements**: 80%

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Push to main/develop
- Multiple Node.js versions (18, 20)

### GitHub Actions Workflow

The workflow includes:
1. **Linting** - ESLint and Prettier checks
2. **Type Checking** - TypeScript compilation
3. **Unit Tests** - With coverage reporting
4. **Build** - Production build verification
5. **Deployment** - Auto-deploy to Netlify (main branch)
6. **Performance** - Lighthouse CI audits

## Common Issues & Solutions

### Testing Library Query Priorities

1. **getByRole** - Best for accessibility
2. **getByLabelText** - Great for forms
3. **getByText** - Good for static content
4. **getByTestId** - Last resort

### Async Testing

```typescript
// ✅ Using async/await
it('loads data asynchronously', async () => {
  render(<Component />);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText(/data loaded/i)).toBeInTheDocument();
  });
});

// ✅ Using findBy* queries
it('loads data with findBy*', async () => {
  render(<Component />);
  
  const dataElement = await screen.findByText(/data loaded/i);
  expect(dataElement).toBeInTheDocument();
});
```

### Testing Form Interactions

```typescript
it('submits form with correct data', async () => {
  const user = userEvent.setup();
  const mockSubmit = vi.fn();
  
  render(<Form onSubmit={mockSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password',
  });
});
```

## Next Steps

1. **Add Integration Tests** - Test complete user flows
2. **Add E2E Tests** - Consider Playwright for end-to-end testing
3. **Performance Monitoring** - Add performance regression tests
4. **Visual Regression** - Consider Chromatic for visual testing

## Resources

- [Testing Library Documentation](https://testing-library.com/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://testing-library.com/docs/queries/about#priority)