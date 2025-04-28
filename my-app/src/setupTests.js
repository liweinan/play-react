import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Add any global setup here if needed
beforeAll(() => {
  // Add any setup that should run before all tests
});

// Add any global teardown here if needed
afterAll(() => {
  // Add any cleanup that should run after all tests
}); 