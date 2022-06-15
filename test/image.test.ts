import { Testing } from 'cdk8s';
import { Image } from '../src';
import * as shell from '../src/_shell';

beforeAll(() => {
  // disable logs
  jest.spyOn(console, 'error').mockReturnValue();
});

afterAll(() => {
  jest.resetAllMocks();
});

test('minimal usage', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-my-image-c80f3600@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600:latest', 'foobar');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600:latest');
});

test('custom registry', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    registry: 'localhost:5000',
  });

  // THEN
  expect(image.url).toEqual('localhost:5000/test-my-image-c80f3600@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'localhost:5000/test-my-image-c80f3600:latest', 'foobar');
  expect(mock).toBeCalledWith('docker', 'push', 'localhost:5000/test-my-image-c80f3600:latest');
});

test('single build arg', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    buildArgs: [{ name: 'FOO', value: 'bar' }],
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-my-image-c80f3600@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600:latest', 'foobar', '--build-arg', 'FOO=bar');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600:latest');
});

test('multiple build args', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    buildArgs: [
      { name: 'FOO', value: 'bar' },
      { name: 'BAR', value: 'baz' },
    ],
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-my-image-c80f3600@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600:latest', 'foobar', '--build-arg', 'FOO=bar', '--build-arg', 'BAR=baz');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600:latest');
});


test('dockerfile specified', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    file: './test/Dockerfile',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-my-image-c80f3600@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600:latest', 'foobar', '-f', './test/Dockerfile') ;
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600:latest');
});

test('platform specified', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    platform: 'linux/x86_64',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-my-image-c80f3600@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600:latest', 'foobar', '--platform=linux/x86_64') ;
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600:latest');
});

test('name specified', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    name: 'test-different-image',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-different-image@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-different-image:latest', 'foobar') ;
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-different-image:latest');
});


test('tag specified', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    tag: '1.0.0',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-my-image-c80f3600:1.0.0');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600:1.0.0', 'foobar') ;
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600:1.0.0');
});


test('name and tag specified', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN --tag
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    name: 'test-different-image',
    tag: '1.0.0',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-different-image:1.0.0');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-different-image:1.0.0', 'foobar') ;
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-different-image:1.0.0');
});

test('name and tag latest specified', () => {
  // GIVEN
  const mock = jest.spyOn(shell, 'shell').mockReturnValue('text\ntext\n\ndigest: sha256:a1b2c3\n');
  const chart = Testing.chart();

  // WHEN --tag
  const image = new Image(chart, 'my-image', {
    dir: 'foobar',
    name: 'test-different-image',
    tag: 'latest',
  });

  // THEN
  expect(image.url).toEqual('docker.io/library/test-different-image:latest');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-different-image:latest', 'foobar') ;
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-different-image:latest');
});