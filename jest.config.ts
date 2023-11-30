/** @type {import('ts-jest').JestConfigWithTsJest} */


export {}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
  setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};