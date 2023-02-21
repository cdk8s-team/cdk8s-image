const { Cdk8sTeamJsiiProject } = require('@cdk8s/projen-common');

const project = new Cdk8sTeamJsiiProject({
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
  devDeps: [
    '@cdk8s/projen-common',
  ],
  name: 'cdk8s-image',
  description: 'Build & Push local docker images inside CDK8s applications',
  defaultReleaseBranch: 'main',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});

project.synth();
