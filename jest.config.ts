import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  preset: '@shelf/jest-mongodb',
};

export default config;
