import { Testing } from 'cdk8s';
import { Image } from '../src';
import * as shell from '../src/_shell';

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
  expect(image.url).toEqual('docker.io/library/test-my-image-ae2c8598@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'docker.io/library/test-my-image-ae2c8598', 'foobar');
  expect(mock).toBeCalledWith('docker', 'push', 'docker.io/library/test-my-image-ae2c8598');
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
  expect(image.url).toEqual('localhost:5000/test-my-image-ae2c8598@sha256:a1b2c3');
  expect(mock).toBeCalledTimes(2);
  expect(mock).toBeCalledWith('docker', 'build', '-t', 'localhost:5000/test-my-image-ae2c8598', 'foobar');
  expect(mock).toBeCalledWith('docker', 'push', 'localhost:5000/test-my-image-ae2c8598');
});