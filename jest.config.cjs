/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ["<rootDir>/src"],
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
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
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
};