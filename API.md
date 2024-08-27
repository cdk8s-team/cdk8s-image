# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Image <a name="Image" id="cdk8s-image.Image"></a>

Represents a docker image built during synthesis from a context directory (`dir`) with a `Dockerfile`.

The image will be built using `docker build` and then pushed through `docker
push`. The URL of the pushed image can be accessed through `image.url`.

If you push to a registry other than docker hub, you can specify the registry
URL through the `registry` option.

#### Initializers <a name="Initializers" id="cdk8s-image.Image.Initializer"></a>

```typescript
import { Image } from 'cdk8s-image'

new Image(scope: Construct, id: string, props: ImageProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-image.Image.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-image.Image.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-image.Image.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-image.ImageProps">ImageProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-image.Image.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-image.Image.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-image.Image.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-image.ImageProps">ImageProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-image.Image.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk8s-image.Image.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-image.Image.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk8s-image.Image.isConstruct"></a>

```typescript
import { Image } from 'cdk8s-image'

Image.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-image.Image.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-image.Image.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk8s-image.Image.property.url">url</a></code> | <code>string</code> | The image URL to use in order to pull this instance of the image. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk8s-image.Image.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `url`<sup>Required</sup> <a name="url" id="cdk8s-image.Image.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

The image URL to use in order to pull this instance of the image.

---


## Structs <a name="Structs" id="Structs"></a>

### BuildArg <a name="BuildArg" id="cdk8s-image.BuildArg"></a>

Build arg to pass to the docker build.

#### Initializer <a name="Initializer" id="cdk8s-image.BuildArg.Initializer"></a>

```typescript
import { BuildArg } from 'cdk8s-image'

const buildArg: BuildArg = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-image.BuildArg.property.name">name</a></code> | <code>string</code> | the name of the build arg. |
| <code><a href="#cdk8s-image.BuildArg.property.value">value</a></code> | <code>string</code> | the value of the build arg. |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk8s-image.BuildArg.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

the name of the build arg.

---

##### `value`<sup>Required</sup> <a name="value" id="cdk8s-image.BuildArg.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

the value of the build arg.

---

### ImageProps <a name="ImageProps" id="cdk8s-image.ImageProps"></a>

Props for `Image`.

#### Initializer <a name="Initializer" id="cdk8s-image.ImageProps.Initializer"></a>

```typescript
import { ImageProps } from 'cdk8s-image'

const imageProps: ImageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-image.ImageProps.property.dir">dir</a></code> | <code>string</code> | The docker build context directory (where `Dockerfile` is). |
| <code><a href="#cdk8s-image.ImageProps.property.buildArgs">buildArgs</a></code> | <code><a href="#cdk8s-image.BuildArg">BuildArg</a>[]</code> | List of build args to pass to the build action. |
| <code><a href="#cdk8s-image.ImageProps.property.file">file</a></code> | <code>string</code> | Path to Dockerfile. |
| <code><a href="#cdk8s-image.ImageProps.property.name">name</a></code> | <code>string</code> | Name for the image. |
| <code><a href="#cdk8s-image.ImageProps.property.platform">platform</a></code> | <code>string</code> | Set to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, or darwin/amd64). |
| <code><a href="#cdk8s-image.ImageProps.property.registry">registry</a></code> | <code>string</code> | The registry URL to use. |
| <code><a href="#cdk8s-image.ImageProps.property.tag">tag</a></code> | <code>string</code> | Tag for the image. |

---

##### `dir`<sup>Required</sup> <a name="dir" id="cdk8s-image.ImageProps.property.dir"></a>

```typescript
public readonly dir: string;
```

- *Type:* string

The docker build context directory (where `Dockerfile` is).

---

##### `buildArgs`<sup>Optional</sup> <a name="buildArgs" id="cdk8s-image.ImageProps.property.buildArgs"></a>

```typescript
public readonly buildArgs: BuildArg[];
```

- *Type:* <a href="#cdk8s-image.BuildArg">BuildArg</a>[]

List of build args to pass to the build action.

---

##### `file`<sup>Optional</sup> <a name="file" id="cdk8s-image.ImageProps.property.file"></a>

```typescript
public readonly file: string;
```

- *Type:* string

Path to Dockerfile.

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk8s-image.ImageProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* auto-generated name

Name for the image.

Docker convention is {registry_name}/{name}:{tag}
Visit https://docs.docker.com/engine/reference/commandline/tag/ for more information

---

##### `platform`<sup>Optional</sup> <a name="platform" id="cdk8s-image.ImageProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Set to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, or darwin/amd64).

---

##### `registry`<sup>Optional</sup> <a name="registry" id="cdk8s-image.ImageProps.property.registry"></a>

```typescript
public readonly registry: string;
```

- *Type:* string
- *Default:* "docker.io/library"

The registry URL to use.

This will be used as the prefix for the image name.

For example, if you have a local registry listening on port 500, you can set this to `localhost:5000`.

---

##### `tag`<sup>Optional</sup> <a name="tag" id="cdk8s-image.ImageProps.property.tag"></a>

```typescript
public readonly tag: string;
```

- *Type:* string
- *Default:* "latest"

Tag for the image.

Docker convention is {registry_name}/{name}:{tag}
Visit https://docs.docker.com/engine/reference/commandline/tag/ for more information

---



