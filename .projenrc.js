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
  name: 'udp-cdk8s-image',
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
    distName: 'udp-cdk8s-image',
    module: 'udp_cdk8s_image',
    twineRegistryUrl: 'https://fso.jfrog.io/artifactory/api/pypi/fso-pypi',
    twineUsernameSecret: 'ARTIFACTORY_USERNAME',
    twinePasswordSecret: 'ARTIFACTORY_TOKEN',
  },
});

project.synth();
