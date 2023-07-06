import { Names } from 'cdk8s';
import { Construct } from 'constructs';
import { shell } from './_shell';

const PARSE_DIGEST = /digest:\ (sha256:[0-9a-f]+)/;

/**
 * Build arg to pass to the docker build
 */
export interface BuildArg {
  /**
   * the name of the build arg
   */
  readonly name: string;

  /**
   * the value of the build arg
   */
  readonly value: string;
}

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

  /**
   * List of build args to pass to the build action
   */
  readonly buildArgs?: BuildArg[];

  /**
   * Path to Dockerfile
   */
  readonly file?: string;

  /**
   * Name for the image.
   * Docker convention is {registry_name}/{name}:{tag}
   * Visit https://docs.docker.com/engine/reference/commandline/tag/ for more information
   * @default - auto-generated name
   */
  readonly name?: string;

  /**
   * Tag for the image.
   * Docker convention is {registry_name}/{name}:{tag}
   * Visit https://docs.docker.com/engine/reference/commandline/tag/ for more information
   * @default "latest"
   */
  readonly tag?: string;

  /**
   * Set to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, or darwin/amd64).
   */
  readonly platform?: string;
}

/**
 * Represents a docker image built during synthesis from a context directory
 * (`dir`) with a `Dockerfile`.
 *
 * The image will be built using `docker build` and then pushed through `docker
 * push`. The URL of the pushed image can be accessed through `image.url`.
 *
 * If you push to a registry other than docker hub, you can specify the registry
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
    const name = props.name || Names.toDnsLabel(this);
    const tag = props.tag || 'latest';
    const fullTag = `${registry}/${name}:${tag}`;
    const allBuildArgs: string[] = [];
    props.buildArgs?.forEach((arg) => {
      allBuildArgs.push('--build-arg');
      allBuildArgs.push(`${arg.name}=${arg.value}`);
    });
    if (props.file) {
      allBuildArgs.push('-f');
      allBuildArgs.push(props.file);
    }
    if (props.platform) {
      allBuildArgs.push(`--platform=${props.platform}`);
    }
    console.error(`building docker image ${fullTag} from ${props.file ? props.file : props.dir}`);
    shell('docker', 'build', '-t', fullTag, props.dir, ...allBuildArgs);
    console.error(`pushing docker image ${fullTag} to ${registry}`);
    const push = shell('docker', 'push', fullTag).toString('utf-8');

    const result = PARSE_DIGEST.exec(push);
    if (!result) {
      throw new Error(`unable to read image digest after push: ${push}`);
    }

    this.url = props.tag ? fullTag:`${registry}/${name}@${result[1]}`;
  }
}
