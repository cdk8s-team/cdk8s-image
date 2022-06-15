# API Reference

**Classes**

Name|Description
----|-----------
[Image](#cdk8s-image-image)|Represents a docker image built during synthesis from a context directory (`dir`) with a `Dockerfile`.


**Structs**

Name|Description
----|-----------
[BuildArg](#cdk8s-image-buildarg)|Build arg to pass to the docker build.
[ImageProps](#cdk8s-image-imageprops)|Props for `Image`.



## class Image  <a id="cdk8s-image-image"></a>

Represents a docker image built during synthesis from a context directory (`dir`) with a `Dockerfile`.

The image will be built using `docker build` and then pushed through `docker
push`. The URL of the pushed image can be accessed through `image.url`.

If you push to a registry other than docker hub, you can specify the registry
URL through the `registry` option.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new Image(scope: Construct, id: string, props: ImageProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ImageProps](#cdk8s-image-imageprops)</code>)  *No description*
  * **dir** (<code>string</code>)  The docker build context directory (where `Dockerfile` is). 
  * **buildArgs** (<code>Array<[BuildArg](#cdk8s-image-buildarg)></code>)  List of build args to pass to the build action. __*Optional*__
  * **file** (<code>string</code>)  Path to Dockerfile. __*Optional*__
  * **name** (<code>string</code>)  Name for the image. __*Default*__: auto-generated name
  * **platform** (<code>string</code>)  Set to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, or darwin/amd64). __*Optional*__
  * **registry** (<code>string</code>)  The registry URL to use. __*Default*__: "docker.io/library"
  * **tag** (<code>string</code>)  Tag for the image. __*Default*__: "latest"


### Properties


Name | Type | Description 
-----|------|-------------
**url** | <code>string</code> | The image URL to use in order to pull this instance of the image.



## struct BuildArg  <a id="cdk8s-image-buildarg"></a>


Build arg to pass to the docker build.



Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | the name of the build arg.
**value** | <code>string</code> | the value of the build arg.



## struct ImageProps  <a id="cdk8s-image-imageprops"></a>


Props for `Image`.



Name | Type | Description 
-----|------|-------------
**dir** | <code>string</code> | The docker build context directory (where `Dockerfile` is).
**buildArgs**? | <code>Array<[BuildArg](#cdk8s-image-buildarg)></code> | List of build args to pass to the build action.<br/>__*Optional*__
**file**? | <code>string</code> | Path to Dockerfile.<br/>__*Optional*__
**name**? | <code>string</code> | Name for the image.<br/>__*Default*__: auto-generated name
**platform**? | <code>string</code> | Set to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, or darwin/amd64).<br/>__*Optional*__
**registry**? | <code>string</code> | The registry URL to use.<br/>__*Default*__: "docker.io/library"
**tag**? | <code>string</code> | Tag for the image.<br/>__*Default*__: "latest"


