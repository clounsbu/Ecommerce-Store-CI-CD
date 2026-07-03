module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
    testMatch: ["**/__tests__/**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
};