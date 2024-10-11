export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts', // Adjust the path according to your project structure
  ],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.app.json',
    },
  },
};
