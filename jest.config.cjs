/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src'],
  testTimeout: 30000,
};

module.exports = config;