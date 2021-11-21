const { JsiiProject } = require('projen');

const project = new JsiiProject({
  authorUrl: 'https://aws.amazon.com',
  authorName: 'Amazon Web Services',
  peerDeps: [
    'constructs',
    'cdk8s',
  ],
  name: 'cdk8s-image',
  description: 'Build & Push local docker images inside CDK8s applications',
  repository: 'git@github.com:cdk8s-team/cdk8s-image.git',
  defaultReleaseBranch: 'main',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  autoApproveOptions: {
    allowedUsernames: ['cdk8s-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
});

project.synth();
