export default {
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { presets: ["@babel/preset-env", "@babel/preset-react"] },
    ],
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom", // Pour tester les composants React
  extensionsToTreatAsEsm: [".jsx"], // Nécessaire pour ESM
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Pour mocker les fichiers CSS
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/jest.fileMock.js", // Pour mocker les fichiers image
  },
};
