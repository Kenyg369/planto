module.exports = {
  setupFiles: ["dotenv/config", "./.env"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^quasar$": "quasar/dist/quasar.umd.prod.js",
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.[jt]s$": "<rootDir>/swc-jest.js",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(quasar|quasar/*|@quasar|@quasar/*))"],
  moduleFileExtensions: ["vue", "ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",
    "!src/layouts/**/*.vue", // No need to cover layout components
    "!src/views/**/*.vue", // No need to cover views components
    "!src/plugins/**/*.ts", // No need to cover plugins
    "!src/api/mocks/**/*.ts", // No need to cover mocks
    "!src/types/**/*.ts", // No need to cover ts types
    "!src/main.ts", // No need to cover bootstrap file
  ],
};
