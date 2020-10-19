import { Names } from 'cdk8s';
import { Construct, Node } from 'constructs';
import { shell } from './_shell';

const PARSE_DIGEST = /digest:\ (sha256:[0-9a-f]+)/;

/**
 * Props for `Image`.
 */
export interface ImageProps {
  /**
   * The docker build context directory (where `Dockerfile` is).
   */
  readonly dir: string;

  /**
   * The registry URL to use.
   *
   * This will be used as the prefix for the image name.
   *
   * For example, if you have a local registry listening on port 500, you can set this to `localhost:5000`.
   *
   * @default "docker.io/library"
   */
  readonly registry?: string;
}

/**
 * Represents a docker image built during synthesis from a context directory
 * (`dir`) with a `Dockerfile`.
 *
 * The image will be built using `docker build` and then pushed through `docker
 * push`. The URL of the pushed image can be accessed through `image.url`.
 *
 * If you push to a registry other then docker hub, you can specify the registry
 * URL through the `registry` option.
 */
export class Image extends Construct {
  /**
   * The image URL to use in order to pull this instance of the image.
   */
  public readonly url: string;

  constructor(scope: Construct, id: string, props: ImageProps) {
    super(scope, id);
    const registry = props.registry ?? 'docker.io/library';
    const tag = `${registry}/${Names.toDnsLabel(Node.of(this).path)}`;
    shell('docker', 'build', '-t', tag, props.dir);
    const push = shell('docker', 'push', tag);

    const result = PARSE_DIGEST.exec(push);
    if (!result) {
      throw new Error(`unable to read image digest after push: ${push}`);
    }

    this.url = `${tag}@${result[1]}`;
  }
}
