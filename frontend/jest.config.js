/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
};

module.exports = config;
