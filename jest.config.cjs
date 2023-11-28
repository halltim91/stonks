/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx|mjs|.css)$': 'babel-jest',
  },
  moduleNameMapper: {
    "axios": require.resolve('axios'),
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  setupFiles: [
    '<rootDir>/src/tests/jest.stub.js',
  ],
};