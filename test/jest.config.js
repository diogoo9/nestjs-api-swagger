// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsconfig = require('../tsconfig.json');

module.exports = {
  roots: ['<rootDir>'],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper({ '@App/*': ['../src/*'] }),

};

jest.setTimeout(30000)
