<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# Structured Data Transfer Format - SDK v1
The _Structured Data Transfer Format_ (sdTF) is an API-neutral exchange and storage format for trees of data items as used by parametric 3D modeling software like Grasshopper®.
This open, efficient, and easily extensible data format enables the exchange of complex data structures, independent of software vendors.
See the [sdTF documentation](https://github.com/shapediver/sdTF/tree/development/specification/1.0) for more details.

The aim of this SDK is to provide an easy-to-use, lightweight, cross-platform library to interact with sdTF files.
The core features consist of an _sdTF reader_, including a flexible and extensible data parser, and an _sdTF writer_ with a built-in structural optimizer.

This module can be used in [Node.js](https://nodejs.org/en/) and modern Browsers, and exposes the respective TypeScript declarations.

## Installation
```shell
npm i @shapediver/sdk.sdtf-v1
```

Additionally, the following _plugins_ can be included as well to improve the handling of specific data types:
* [Primitive type integration](https://www.npmjs.com/package/@shapediver/sdk.sdtf-primitives) - _added by default_!
* [Geometry type integration](https://www.npmjs.com/package/@shapediver/sdk.sdtf-geometry) - _added by default_!
* [Rhino3dm type Integration](https://www.npmjs.com/package/@shapediver/sdk.sdtf-rhino3dm)

However, it is easy to implement new integrations for custom types!\
See [integrations](https://github.com/shapediver/ShapeDiverSdtfTypeScript#integrations) for more information.

## Usage
This code initializes the SDK, reads the sdTF file at the given path and prints the file's [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification).
```typescript
// index.ts
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"

(async () => {
    const sdk: SdtfSdk = await create()
    const sdTF = await sdk.createParser().readFromFile("./test_data/sdTF_spec_example.sdtf")
    console.log(sdk.createFormatter().prettifyReadableAsset(sdTF))
})()
```


## SDK initialization and configuration
The SDK handles sdTF content in a structural way.
It allows to read and write sdTF structures, and provides data access functions to the user.
According to the [sdTF v1 specification](https://github.com/shapediver/sdTF/tree/development/specification/1.0), data content is stored in [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1), whereby their respective content type is specified via [typehint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint) components.
However, the SDK is not concerned with data content types.
Instead, data content is returned with type `unknown` and the responsibility of explicitly typing the data content is passed on to the user.
As long as the sdTF component structure is valid, sdTFs can be read and written without issues.

To manage the mapping, validation and optimization of content data, the SDK can be extended by various _integrations_.
[sdTF integrations](https://github.com/shapediver/ShapeDiverSdtfTypeScript#integrations) provide an easy way to customize reading and writing of data content for specific data types.
By default, the SDK instantiates the integrations for [primitive types](https://www.npmjs.com/package/@shapediver/sdk.sdtf-primitives) and [geometry types](https://www.npmjs.com/package/@shapediver/sdk.sdtf-geometry).
The default integrations can be adopted by specifying a customized list of integrations in the `integrations`-array of the `SdtfConfig` object.

By default, the SDK does not use any authorization token for its HTTP calls.
However, ShapeDiver models can be configured so that all interactions with them require a JSON Web Token (JWT) for authorization.
Thus, a valid JWT must be provided when the SDK is instantiated and the sdTF file is accessed remotely (`readFromUrl`).
Otherwise, a`401` HTTP status is returned when the sdTF is fetched.

```typescript
import { create } from "@shapediver/sdk.sdtf-v1"

create({
    // Remove the default integrations from the sdTF
    integrations: [],
    
    // Add a JWT for HTTP authorization
    authToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3d3dy5zaGFwZWRpdmVyLmNvbS9hcGkvdjEvdG9rZW5zIiwic3ViIjoiMWM0MzY2MzAtMWYxNy00Y2QyLWFmMTItNDNiYTMzZmVkMDYyIiwiYXVkIjoiOTIwNzk0ZmEtMjQ1YS00ODdkLThhYmUtYWY1NjlhOTdkYTQyIiwiZXhwIjoxNjY3NDc4MDUzLCJzY29wZSI6Imdyb3VwLmV4cG9ydCBncm91cC52aWV3IiwiaWF0IjoxNjY3NDc0NDUzLCJzZF91c2VyX2lkIjoiOTQ4MzJlN2YtMGNjNS00YjE4LWIxNGItOTBkN2FlZTYxYzIzIn0.AKkzs-mCW_3qA3XISMiaW6Bp_MFPVoUnWPWcPllUOZ1Ve5K_tFd0xxpT_T0AoUs8OxQZBXujdKojJLj5sbycKA7X9IEGomQBYjCoTJsQGeafFJW_LSrWb9Z4L9xTu0g02UcvKbwSxyIxLug0pVunklSNN382sgbcKVt6ZapT5a8YGaH5LjYCHVb90OTTQ2JUurtdyqyBLJ1CJbszdkggZuyV2uHhSgJ--jrxcOq_lBgI-tuPj4cbQx340vdhPFXTZA9NAnk6fuI8kfSSej-BQpkdHBi_FAhxlQf5AZov6BonaKl8KIvcFi2Zk77jyB6fjfWwXsT5s0kNVaali58PXQ"
}).then(sdk => {
    // use sdk here
})
```


## Reading a sdTF file
The `ISdtfParser` object exposes functionality to read an existing sdTF file from various sources and parsing the sdTF structure.

__parser.readFromBuffer__:\
Parses the sdTF file from the given `ArrayBuffer` and returns a new `ISdtfReadableAsset` object.

_Note about external buffers_:\
External buffers are not supported.
When an [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer) component contains a `uri` property to reference an external buffer data, the SDK throws an error when the user tries to access its data.
```typescript
const sdk = await create()
const parser = await sdk.createParser()

const sdtfBuffer = new Uint8Array([ /* ... */ ])
const asset = parser.readFromBuffer(sdtfBuffer.buffer)
```

__parser.readFromUrl__:\
The SDK fetches the sdTF file from the given URL and returns a new `ISdtfReadableAsset` object.

If possible, the SDK tries to acquire data via _HTTP range requests_ to reduce network traffic.
However, when the server does not support range requests, the full sdTF file is loaded.

_Note about external buffers_:\
When an [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer) component contains a `uri` property to reference an external buffer data, the SDK interprets the URI as a URL relative to the location of the parsed sdTF file, and tries to fetch the buffer when the user tries to access its data.
```typescript
const sdk = await create()
const parser = await sdk.createParser()
const asset = await parser.readFromUrl("https://shapediver.com/sdtf")
```

__parser.readFromFile__:\
The SDK reads the sdTF file at the specified path and returns a new `ISdtfReadableAsset` object.

_Note about external buffers_:\
When an [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer) component contains a `uri` property to reference an external buffer data, the SDK interprets the URI as a file path relative to the location of the parsed sdTF file, and tries to read the buffer file when the user tries to access its data.

__Only available in [Node.js](https://nodejs.org/en/)__!
```typescript
const sdk = await create()
const parser = await sdk.createParser()
const asset = await parser.readFromFile("./test_data/sdTF_spec_example.sdtf")
```

### Readable sdTF asset
The `ISdtfParser` returns a new `ISdtfReadableAsset` instance when a sdTF file is parsed, which holds the sdTF [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) and provides functions to access the data.
Like the sdTF [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification), the `ISdtfReadableAsset` stores information in the form of one or more hierarchical tree structures.
The following functions give access to the individual elements of the trees:

__readableAsset.accessors__:\
Holds all [accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessors) components of the sdTF file.\
[Accessors](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessor) are used to link content data that is stored inside a [buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer), and they can be referenced by [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1).

__readableAsset.attributes__:\
Holds all [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes) components of the sdTF file.\
[Attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1) are used to attach additional information to components, and they can be referenced by [chunks](https://github.com/shapediver/sdTF/tree/development/specification/1.0#chunk), [nodes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#node) and [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item).
They can either store content data directly in the [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) of the sdTF, or they store the data in a [binary buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) and reference it.

__readableAsset.buffers__:\
Holds all [buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffers) components of the sdTF file.\
[Buffers](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer) are used to story binary data, and are referenced by [buffer views](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferview).

__readableAsset.bufferViews__:\
Holds all [buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferviews) components of the sdTF file.\
[Buffer views](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferview) specify portions of a [buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer), and are referenced by [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1).

__readableAsset.chunks__:\
Holds all [chunk](https://github.com/shapediver/sdTF/tree/development/specification/1.0#chunks) components of the sdTF file.\
[Chunks](https://github.com/shapediver/sdTF/tree/development/specification/1.0#chunk) are fairly similar to [nodes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#node), but they provide the entry points to the hierarchical tree structure of sdTF.

__readableAsset.items__:\
Holds all [data item](https://github.com/shapediver/sdTF/tree/development/specification/1.0#data-items) components of the sdTF file.\
[Data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) represent _leaf nodes_ in the hierarchical tree structure of sdTF.
They can either store content data directly in the [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) of the sdTF, or they store the data in a [binary buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) and reference it.

__readableAsset.nodes__:\
Holds all [node](https://github.com/shapediver/sdTF/tree/development/specification/1.0#nodes) components of the sdTF file.\
[Nodes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#node) represent _nodes with children_ in the hierarchical tree structure of sdTF. 

__readableAsset.typeHints__:\
Holds all [type hint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#type-hints) components of the sdTF file.\
[Type hints](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint) are used to assign type information.
When they are referenced by [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) or [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1), they specify the type of their respective data content.
However, when they are referenced by [chunks](https://github.com/shapediver/sdTF/tree/development/specification/1.0#chunk) or [nodes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#node), they indicate that all the data content hold by [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) of these nodes and all their sub-nodes are of the referenced type.

__readableAsset.fileInfo__:\
Holds the [file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#asset) component of the sdTF file.\
The [file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo) contains general information about the sdTF asset.

### Get data content
According to the [sdTF v1 specification](https://github.com/shapediver/sdTF/tree/development/specification/1.0), data content is stored in [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1), whereby their respective content type is specified via [typehint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint) components.
This data content can either be stored directly in the [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) of the sdTF file, or in the [binary buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification).
In both cases, the data content can be requested via the `getContent()` function in `ISdtfReadableDataItem` and `ISdtfReadableAttribute`.
This function extracts the data value, and, when _sdTF integrations_ have been registered in the SDK, processes it by applying _integration-readers_ that support the respective type hint.
The result is then returned to the callee.
```typescript
const sdk = await create()
const parser = await sdk.createParser()

// Reads the example file given in the sdTF specification v1:
// https://github.com/shapediver/sdTF/tree/development/specification/1.0#a-complete-example
const asset = await parser.readFromFile("./test_data/sdTF_spec_example.sdtf")

// Item[1]:
// {
//     "accessor": 1,   // references the data in the binary buffer
//     "typeHint": 0    // references type "rhino.mesh"
// }
const value1 = await asset.items[1].getContent()  // `ISdtfBufferValue { id: 'e2bb8f80-5df3-41a4-b6ad-ce5e71f2bd06',  data: DataView }`

// Item[4]:
// {
//     "typeHint": 2,   // references type "double"
//     "value": 1       // stores data `1` directly in the JSON content
// }
const value4 = await asset.items[4].getContent()  // `1`
```
_Note about data content stored in a buffer_:\
A single [buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferview) component might be used to store multiple objects.
In this case, the [accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessor) that references this [buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferview) also contains an `id` property.
This ID can be used to reference individual objects inside the [buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferview).
Thus, when data content is loaded from a buffer, the result is wrapped in a `ISdtfBufferValue` object, that contains the `id` and the `data` content.

_Note about external data content_:\
When data is stored in an external [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer) component that contains a `uri` property, the SDK tries to load the external buffer before extracting the requested data content.
This way, external sdTF buffers are loaded on-demand to improve the overall performance when reading a sdTF file.


## Creating a new sdTF file
The `ISdtfConstructor` object exposes functionality to create a new sdTF file.
A new sdTF structure can either be defined by creating individual sdTF components via a __low-level factory__ and linking them manually, or by using a data-centric approach via a __high-level writer__ interface.

__constructor.getFactory__:\
Instantiates and returns a new `ISdtfWriteableComponentFactory`.\
See [creation via low-level factory](https://github.com/shapediver/ShapeDiverSdtfTypeScript/tree/master/packages/sdk.sdtf-v1#creation-via-low-level-factory) for more information.

__constructor.getWriter__:\
Instantiates and returns a new `ISdtfWriter`.\
See [creation via high-level writer](https://github.com/shapediver/ShapeDiverSdtfTypeScript/tree/master/packages/sdk.sdtf-v1#creation-via-high-level-writer) for more information.

__constructor.createBinarySdtf__:\
Both, the `ISdtfWriteableComponentFactory` and the `ISdtfWriter`, create a new `ISdtfWriteableAsset` object.
This function creates a new sdTF file from the writeable-asset.
During this step, the structure of the sdTF is optimized by complementing and merging duplicated [type hints](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint) components, and merging [buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer) components.
Additionally, when _sdTF integrations_ have been registered in the SDK, the data content in all [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1) components is processed by _integration-writers_ that support their respective [type hint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint).


### Creation via low-level factory
The `ISdtfWriteableComponentFactory` enables the callee to create new instances of writable sdTF components.
These components can then be modified and linked as needed.
```typescript
const sdk = await create()
const constructor = sdk.createConstructor()
const factory = constructor.getFactory()

// Create a data item with 2 attribute - both storing their content directly in the sdTF JSON content object
const dataItem1 = factory.createDataItem("foobar", "string")
dataItem1.attributes = factory.createAttributes({ "randomness1": [ Math.random(), "double" ] })
dataItem1.attributes = factory.createAttributes({ "randomness2": [ Math.random(), "double" ] })

// Creating a data item that stores the content in the sdTF binary buffer
const dataItem2 = factory.createDataItem({ data: new Uint8Array([ 115, 100, 116, 102 ]).buffer, contentType: "text" }, "data")

// Create a new chunk and add both data items
const chunk = factory.createChunk("root")
chunk.items.push(dataItem1, dataItem2)

// Create a new asset object (automatically adds default file info) and add the chunk
const asset = factory.createAsset()
asset.chunks.push(chunk)

// Creates a new sdTF file from the writeable-asset
const sdtf = constructor.createBinarySdtf(asset)

// sdTF - JSON content:
// {
//     "asset": {
//         "generator": "ShapeDiverSdtfWriter",
//         "version": "1.0"
//     },
//     "chunks": [
//         {
//             "items": [ 0, 1 ],
//             "name": "root"
//         }
//     ],
//     "nodes": [],
//     "items": [
//         {
//             "attributes": 0,
//             "typeHint": 0,
//             "value": "foobar"
//         },
//         {
//             "accessor": 0,
//             "typeHint": 1
//         }
//     ],
//     "attributes": [
//         {
//             "randomness1": {
//                 "typeHint": 2,
//                 "value": 0.8678168398187562
//             },
//             "randomness2": {
//                 "typeHint": 2,
//                 "value": 0.26541621248656133
//             }
//         }
//     ],
//     "typeHints": [
//         { "name": "string" },
//         { "name": "data" },
//         { "name": "double" }
//     ],
//     "accessors": [
//         { "bufferView": 0 }
//     ],
//     "bufferViews": [
//         {
//             "buffer": 0,
//             "byteLength": 4,
//             "byteOffset": 0,
//             "contentType": "text"
//         }
//     ],
//     "buffers": [ 
//         { "byteLength": 4 }
//    ]
// }
```

### Creation via high-level writer
The `ISdtfWriter` enables more of a data-centric approach to create new sdTF files.
Each available function creates a specific sdTF structure and fills it with the provided user data.

__writer.createSimpleDataSdtf__:\
This function creates a simple, linear sdTF structure that consists of a single chunk with one or more data nodes.
The given user data consists of [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and optional [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1).
```typescript
const sdk = await create()
const constructor = sdk.createConstructor()

const asset = constructor.getWriter().createSimpleDataSdtf("tester", [
    // Creating two data items, both storing their content directly in the sdTF JSON content object
    { content: "foobar", typeHint: "string" },
    { content: Math.random(), typeHint: "double" },

    // Creating a data item that stores the content in the sdTF binary buffer
    { content: { data: new Uint8Array([ 115, 100, 116, 102 ]).buffer, contentType: "text" }, typeHint: "data" }
])

// Creates a new sdTF file from the writeable-asset
const sdtf = constructor.createBinarySdtf(asset)

// sdTF - JSON content:
// {
//     "asset": {
//       "generator": "ShapeDiverSdtfWriter",
//       "version": "1.0"
//     },
//     "chunks": [
//         {
//             "items": [ 0, 1, 2 ],
//             "name": "tester" 
//         }
//     ],
//     "nodes": [],
//     "items": [
//         {
//             "typeHint": 0,
//             "value": "foobar"
//         },
//         {
//             "typeHint": 1,
//             "value": 0.29872278297090205
//         },
//         {
//             "accessor": 0,
//             "typeHint": 2
//         }
//     ],
//     "attributes": [],
//     "typeHints": [
//         { "name": "string" },
//         { "name": "double" },
//         { "name": "data" }
//     ],
//     "accessors": [
//         { "bufferView": 0 }
//     ],
//     "bufferViews": [
//         {
//             "buffer": 0,
//             "byteLength": 4,
//             "byteOffset": 0,
//             "contentType": "text"
//         }
//     ],
//     "buffers": [
//         { "byteLength": 4 }
//     ]
// }
```

__writer.createGrasshopperSdtfBuilder__:\
This function returns a builder instance to generate a structure that holds one or more Grasshopper® data trees.

A Data Tree in Grasshopper® is a hierarchical structure for storing data in nested lists.
Every tree represents a single _parameter_ and consists of _branches_ and _paths_.
While the _branches_ store the actual data in sub-lists, every sub-list in _paths_ corresponds to a branch name and is used to index it.
Thus, the number of sub-lists in _branches_ and _paths_ must be equal.

_Note about current restrictions_:\
Every tree can consist of only a single type of data (all [type hints](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint) must be the same).
```typescript
const sdk = await create()
const constructor = sdk.createConstructor()
const factory = constructor.getFactory()
const builder = constructor.getWriter().createGrasshopperSdtfBuilder()

// Create two branches that hold the data - all of the same type.
// It must consist of as many sub-lists as `paths.`
const branches = [
    [
        // Creating two data items, both storing their content directly in the sdTF JSON content object
        factory.createDataItem("foo", "string"),
        factory.createDataItem("bar", "string"),
    ],
    [
        // Creating a data item that stores the content directly in the sdTF JSON content object
        factory.createDataItem("baz", "string"),
    ],
]

// Create two paths, one for each branch.
// Note: "[ 0, 0 ]" is the name of the first branch, "[ 0, 1 ]" is the name of the seconds branch.
const paths = [
    [ 0, 0 ],
    [ 0, 1 ],
]

// Set the data of a single parameter.
// The parameter is represented by a new chunk that acts as an entry point for the data tree.
builder.addChunkForTreeData("ce0065af-8a90-4cd7-aa83-b8551fa7174a", { branches, paths })

// Create the asset
const asset = builder.build()

// Creates a new sdTF file from the writeable-asset
const sdtf = constructor.createBinarySdtf(asset)

// sdTF - JSON content:
// {
//     "asset": {
//         "generator": "ShapeDiverSdtfWriter",
//         "version": "1.0"
//     },
//     "chunks": [
//         {
//             "name": "ce0065af-8a90-4cd7-aa83-b8551fa7174a",
//             "nodes": [ 0, 1 ],
//             "typeHint": 0
//         }
//     ],
//     "nodes": [
//         {
//             "items": [ 0, 1 ],
//             "name": "[0,0]",
//             "typeHint": 0
//         },
//         {
//             "items": [ 2 ],
//             "name": "[0,1]",
//             "typeHint": 0
//         }
//     ],
//     "items": [
//         {
//             "typeHint": 0,
//             "value": "foo"
//         },
//         {
//             "typeHint": 0,
//             "value": "bar"
//         },
//         {
//             "typeHint": 0,
//             "value": "baz"
//         }
//     ],
//     "attributes": [],
//     "typeHints": [
//         { "name": "string" }
//     ],
//     "accessors": [],
//     "bufferViews": [],
//     "buffers": []
// }
```


## Formatter
The `ISdtfFormatter` provides functionality to prettify the [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) of an sdTF asset.

__formatter.prettifyReadableAsset__:\
Generates the _JSON content_ of the given readable-asset, prettifies it and returns the JSON as a string.
```typescript
const sdk = await create()
const formatter = sdk.createFormatter()

const sdtf = await sdk.createParser().readFromFile("./test_data/sdTF_spec_example.sdtf")  // Creates a readable-asset
console.log(formatter.prettifyReadableAsset(sdtf))                                        // Logs the prettified JSON content to the console
```

__formatter.prettifyWriteableAsset__:\
Generates the _JSON content_ of the given writeable-asset.
When _sdTF integrations_ have been registered in the SDK, the data content in all [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item) and [attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1) components is processed by _integration-writers_ that support their respective [typehint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint).
Afterwards, the structure of the generated _JSON content_ is further optimized.
The resulting JSON is then prettified and returned as a string.
```typescript
const sdk = await create()
const writer = await sdk.createConstructor().getWriter()
const formatter = sdk.createFormatter()

const data: ISdtfWriterDataItem = { content: "foobar", typeHint: "string" }
const sdtf = writer.createSimpleDataSdtf("tester", [ data ])   // Creates a writeable-asset
console.log(formatter.prettifyWriteableAsset(sdtf))            // Logs the prettified JSON content to the console
```


## CLI
This module comes with a simple, zero-overhead CLI tool to print out the [JSON content](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification) of a specified sdTF file.

Examples:
```shell
# Fetch sdTF from URL
$ npx sdtf-v1 json-content -u "https://shapediver.com/sdtf"

# Read sdTF from file
$ npx sdtf-v1 json-content -f "./test_data/sdTF_spec_example.sdtf"
```


## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/LICENSE).
