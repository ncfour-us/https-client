import {
  TypeScriptESMProject,
  RepoBuildPackageModel,
  sampleReadmeProps,
} from '@ncfour-us/projen-utils';
import { javascript } from 'projen';

const project = new TypeScriptESMProject({
  authorName: 'Tim Hahn',
  authorEmail: 'hahntj@gmail.com',

  defaultReleaseBranch: 'main',
  name: 'https-client',
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,

  repository: 'https://github.com/hahntj/ncfour/https-client.git',

  // set up the package name in package.json
  packageName: '@ncfour-us/https-client',

  // set up the project with a LICENSE and copyright info
  license: 'MIT',
  copyrightOwner: 'Tim Hahn',
  copyrightPeriod: '2024',

  // eslint options
  eslintOptions: {
    dirs: ['src'],
    prettier: true,
  },

  devDeps: ['@ncfour-us/projen-utils', '@jest/globals'],
  deps: ['@ncfour-us/logging@file:/home/tjh/.tjh-packages/ncfour-us-logging-0.0.2.tgz'],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */

  eslintFlatConfig: true,
  prettierFlatConfig: true,
  precommitConfig: true,
  pnpmWorkspace: true,
  examplesFolder: true,

  repoBuildPackageModel: RepoBuildPackageModel.LOCAL_BUILD_PACKAGE,
  localPackageArchiveDir: '~/.tjh-packages',
  releaseToLocal: true,
  releaseToGithub: false,

  docsIndex: true,
  apiDocumentation: true,
  apiEntryPoints: ['src/index.ts'],

  readme: sampleReadmeProps({
    namespace: '@ncfour-us',
    project: 'https-client',
    author: 'Tim Hahn',
    authorEmail: 'hahntj@gmail.com',
    authorGithubUser: 'climbertjh',
    license: 'MIT',
  }),
});

// mark the entry points to the module
project.addFields({
  exports: {
    '.': './lib/index.js',
  },
});

project.synth();
