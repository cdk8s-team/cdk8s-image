const { ConstructLibraryCdk8s, Semver } = require('projen');

const project = new ConstructLibraryCdk8s({
  authorAddress: "benisrae@amazon.com",
  authorName: "Elad Ben-Israel",
  cdk8sVersion: "1.0.0-beta.3",
  name: "cdk8s-image",
  description: 'CDK8s docker image construct',
  repository: "git@github.com:eladb/cdk8s-image.git",
  defaultReleaseBranch: 'main',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN'
});

project.addPeerDependencies({
  constructs: Semver.caret('3.0.4'),
});

project.synth();
