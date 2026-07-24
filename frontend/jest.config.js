module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    reporters: ['default', ['jest-junit', { outputDirectory: 'reports', outputName: 'junit.xml' }]],
};
