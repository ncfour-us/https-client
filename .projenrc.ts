import { TypeScriptESMProject } from "@ncfour/projen-utils";
import { javascript } from "projen";
const project = new TypeScriptESMProject({
  authorName: "Tim Hahn",
  authorEmail: "hahntj@gmail.com",

  defaultReleaseBranch: "main",
  name: "https-client",
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,

  repository: "https://github.com/hahntj/ncfour/https-client.git",

  // set up the package name in package.json
  packageName: "@ncfour/https-client",

  // set up the project with a LICENSE and copyright info
  license: "MIT",
  copyrightOwner: "Tim Hahn",
  copyrightPeriod: "2024",

  // eslint options
  eslintOptions: {
    dirs: ["src"],
    prettier: true,
  },

  devDeps: [
    "@ncfour/projen-utils@file:../projen-utils/dist/js/projen-utils@0.0.0.jsii.tgz",
    "@jest/globals",
  ],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
