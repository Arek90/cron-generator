// jest.config.js
module.exports = {
  preset: "ts-jest", // Użycie ts-jest jako preset
  testEnvironment: "jest-environment-jsdom", // Środowisko testowe: jsdom
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Skrypt do ustawień po uruchomieniu
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpilacja plików TypeScript
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Rozszerzenia plików
  testMatch: [
    "**/src/**/*.test.ts", // Dopasowanie plików testowych TS
    "**/src/**/*.test.tsx", // Dopasowanie plików testowych TSX
    "**/src/customHooks/**/*.jest.ts", // Dopasowanie testów w folderze customHooks
    "**/src/components/**/*.jest.ts", // Dopasowanie testów w folderze components
  ],
};
