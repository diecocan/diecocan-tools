module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    reporters: ['default', ['jest-junit', { outputDirectory: 'reports', outputName: 'junit.xml' }]],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/index.js',
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
        },
    },
};
