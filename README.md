# cdk8s-image

An `Image` construct which takes care of building & pushing docker images that
can be used in [CDK8s](https://github.com/awslabs/cdk8s) apps.

The following example will build the docker image from `Dockerfile` under the
`my-app` directory, push it to a local registry and then define a Kubernetes
deployment that deploys containers that run this image.

```ts
const image = new Image(this, 'image', {
  dir: `${__dirname}/my-app`,
  registry: 'localhost:5000'
});

new Deployment(this, 'deployment', {
  containers: [ new Container({ image: image.url }) ],
});
```

## Contributions

All contributions are celebrated.

## License

Licensed under [Apache 2.0](./LICENSE).
