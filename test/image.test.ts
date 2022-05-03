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
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600', 'foobar');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600');
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
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'localhost:5000/test-my-image-c80f3600', 'foobar');
  expect(mock).toBeCalledWith('docker', 'push', 'localhost:5000/test-my-image-c80f3600');
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
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600', 'foobar', '--build-arg', 'FOO=bar');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600');
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
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-c80f3600', 'foobar', '--build-arg', 'FOO=bar', '--build-arg', 'BAR=baz');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-c80f3600');
});
