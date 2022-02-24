const { cdk } = require('projen');

const project = new cdk.JsiiProject({
  authorUrl: 'https://aws.amazon.com',
  authorName: 'Amazon Web Services',
  keywords: [
    'cdk8s',
    'docker',
    'containers',
    'kubernetes',
  ],
  peerDeps: [
    'constructs',
    'cdk8s',
  ],
  name: 'cdk8s-image',
  minNodeVersion: '14.17.0',
  description: 'Build & Push local docker images inside CDK8s applications',
  repository: 'https://github.com/cdk8s-team/cdk8s-image',
  defaultReleaseBranch: 'main',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  autoApproveOptions: {
    allowedUsernames: ['cdk8s-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,

  publishToPypi: {
    distName: 'cdk8s-image',
    module: 'cdk8s_image',
  },
});

project.synth();
