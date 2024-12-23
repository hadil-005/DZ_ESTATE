module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/fileMock.js", // Ajoutez cette ligne
  },
};
