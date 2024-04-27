import { TypeScriptESMProject } from '@ncfour/projen-utils';
import { javascript } from 'projen';
const project = new TypeScriptESMProject({
  defaultReleaseBranch: 'main',
  devDeps: ['@ncfour/projen-utils@file:../projen-utils/dist/js/projen-utils@0.0.0.jsii.tgz'],
  name: 'http-client',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();