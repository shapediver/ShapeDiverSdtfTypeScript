<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# Structured Data Transfer Format - Integration for rhino3dm types
The _Structured Data Transfer Format_ (sdTF) is an API-neutral exchange and storage format for trees of data items as used by parametric 3D modeling software like Grasshopper®.
This open, efficient, and easily extensible data format enables the exchange of complex data structures, independent of software vendors.
See the [sdTF documentation](https://github.com/shapediver/sdTF/tree/development/specification/1.0) for more details.

The aim of this package is to extend the [sdTF-v1](https://www.npmjs.com/package/@shapediver/sdk.sdtf-v1) module to provide processing and typing functionality for [rhino3dm.js](https://www.npmjs.com/package/rhino3dm) data.

It can be used in [Node.js](https://nodejs.org/en/) and modern Browsers, and exposes the respective TypeScript declarations.

## Installation
```shell
npm i @shapediver/sdk.sdtf-v1 @shapediver/sdk.sdtf-rhino3dm
```

This package is a plugin for the [sdTF-v1](https://www.npmjs.com/package/@shapediver/sdk.sdtf-v1) module and cannot be used by itself.

## Usage
This code initializes the SDK and registers the integration for [rhino3dm](https://mcneel.github.io/rhino3dm/javascript/api/index.html) types.
After this step, the integration is fully included in all reading and writing processes of the SDK instance.
```typescript
// index.ts
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdtfRhino3dmTypeIntegration } from "@shapediver/sdk.sdtf-rhino3dm"

(async () => {
    const sdk: SdtfSdk = await create({
        integrations: [ new SdtfRhino3dmTypeIntegration() ]
    })

    // Use the sdk here
})()
```

### Configuration
The behaviour of the integration can be configured by passing a partial `SdtfRhino3dmTypeConfig` object to the constructor.

__config.enableCompression__:\
When creating a new sdTF file, the integration stores all rhino3dm components in a [File3dm](https://mcneel.github.io/rhino3dm/javascript/api/File3dm.html) object and stores them in the sdTF [binary buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification).
When `enableCompression` is set to `true`, the [File3dm](https://mcneel.github.io/rhino3dm/javascript/api/File3dm.html) object is compressed via GZIP to reduce its overall size.

_Default_: `true`

__config.requireValidRhino3dmComponents__:\
When creating a new sdTF file, the integration stores all rhino3dm components in a [File3dm](https://mcneel.github.io/rhino3dm/javascript/api/File3dm.html) object and stores them in the sdTF [binary buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#binary-sdtf-file-format-specification).
When `requireValidRhino3dmComponents` is set to `true`, all rhino3dm components are tested for validity via the [isValid](https://mcneel.github.io/rhino3dm/javascript/api/CommonObject.html#isValid) function, before they are written.

_Default_: `true`

__Example__:
```typescript
const sdk: SdtfSdk = await create({
    integrations: [ new SdtfRhino3dmTypeIntegration({
        enableCompression: false,                               // Disable GZIP compression of the `File3dm` object
        requireValidRhino3dmComponents: false                   // Disable the validation-check for all rhino3dm components
    }) ]
})
```

### Rhino3dm
We highly recommend not to use multiple instances of the [rhino3dm](https://mcneel.github.io/rhino3dm/javascript/api/index.html) library.
Instead, use the exposed wrapper `SdtfRhino3dmSingleton` to avoid problems during the sdTF creation process.
```typescript
const sdk = await create({
    integrations: [ new SdtfRhino3dmTypeIntegration({ enableCompression: false }) ],
})
const constructor = sdk.createConstructor()
const factory = constructor.getFactory()
const builder = constructor.getWriter().createGrasshopperSdtfBuilder()

// DO NOT USE THIS!
// const rhino: RhinoModule = await require("rhino3dm")()

const rhino = SdtfRhino3dmSingleton.getInstance()   // This is the best way to use rhino3dm with the SDK

const polyline = new rhino.Polyline(3)
polyline.add(0.1, 0.2, 0.3)
polyline.add(0.4, 0.6, 0.8)
polyline.add(0.5, 0.7, 0.9)
const polylineCurve = polyline.toPolylineCurve()

// Create a chunk which represents a Grasshopper tree of polylines.
const branches = [
    [ factory.createDataItem(polylineCurve, SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE) ],
]
const paths = [
    [ 0 ],  // Note: "[ 0 ]" is the name of the branch.
]
builder.addChunkForTreeData(
    "Curve",
    { branches, paths },
    factory.createAttributes({ "Name": [ "Crv" ] }),
)

// Creates a new sdTF file from the writeable-asset
const writeableAsset = builder.build()
const sdtf = constructor.createBinarySdtf(writeableAsset)

// Parse the sdTF file and print the structure
const readableAsset = sdk.createParser().readFromBuffer(sdtf)
console.log(sdk.createFormatter().prettifyReadableAsset(readableAsset))
```

## Supported types
The following table lists all [type hints](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehintname-white_check_mark) that are supported by this integration, their specific _TypeScript types_, and the provided _type guard functions_ that can be used to infer a data content type.

| Type hint name                                                          | TypeScript type                                                                      | Type guard                                                                                  |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `"grasshopper.path"` or `SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH`  | `string`                                                                             | `SdtfRhino3dmTypeGuard.assertGrasshopperPath`<br/>`SdtfRhino3dmTypeGuard.isGrasshopperPath` |
| `"rhino.arccurve"` or `SdtfRhino3dmTypeGuard.RHINO_ARC_CURVE`           | [ArcCurve](https://mcneel.github.io/rhino3dm/javascript/api/ArcCurve.html)           | `SdtfRhino3dmTypeGuard.assertArcCurve`<br/>`SdtfRhino3dmTypeGuard.isArcCurve`               |
| `"rhino.brep"` or `SdtfRhino3dmTypeGuard.RHINO_BREP`                    | [Brep](https://mcneel.github.io/rhino3dm/javascript/api/Brep.html)                   | `SdtfRhino3dmTypeGuard.assertBrep`<br/>`SdtfRhino3dmTypeGuard.isBrep`                       |
| `"rhino.curve"` or `SdtfRhino3dmTypeGuard.RHINO_CURVE`                  | [Curve](https://mcneel.github.io/rhino3dm/javascript/api/Curve.html)                 | `SdtfRhino3dmTypeGuard.assertCurve`<br/>`SdtfRhino3dmTypeGuard.isCurve`                     |
| `"rhino.extrusion"` or `SdtfRhino3dmTypeGuard.RHINO_EXTRUSION`          | [Extrusion](https://mcneel.github.io/rhino3dm/javascript/api/Extrusion.html)         | `SdtfRhino3dmTypeGuard.assertExtrusion`<br/>`SdtfRhino3dmTypeGuard.isExtrusion`             |
| `"rhino.linecurve"` or `SdtfRhino3dmTypeGuard.RHINO_LINE_CURVE`         | [LineCurve](https://mcneel.github.io/rhino3dm/javascript/api/LineCurve.html)         | `SdtfRhino3dmTypeGuard.assertLineCurve`<br/>`SdtfRhino3dmTypeGuard.isLineCurve`             |
| `"rhino.mesh"` or `SdtfRhino3dmTypeGuard.RHINO_MESH`                    | [Mesh](https://mcneel.github.io/rhino3dm/javascript/api/Mesh.html)                   | `SdtfRhino3dmTypeGuard.assertMesh`<br/>`SdtfRhino3dmTypeGuard.isMesh`                       |
| `"rhino.nurbscurve"` or `SdtfRhino3dmTypeGuard.RHINO_NURBS_CURVE`       | [NurbsCurve](https://mcneel.github.io/rhino3dm/javascript/api/NurbsCurve.html)       | `SdtfRhino3dmTypeGuard.assertNurbsCurve`<br/>`SdtfRhino3dmTypeGuard.isNurbsCurve`           |
| `"rhino.nurbssurface"` or `SdtfRhino3dmTypeGuard.RHINO_NURBS_SURFACE`   | [NurbsSurface](https://mcneel.github.io/rhino3dm/javascript/api/NurbsSurface.html)   | `SdtfRhino3dmTypeGuard.assertNurbsSurface`<br/>`SdtfRhino3dmTypeGuard.isNurbsSurface`       |
| `"rhino.planesurface"` or `SdtfRhino3dmTypeGuard.RHINO_PLANE_SURFACE`   | [PlaneSurface](https://mcneel.github.io/rhino3dm/javascript/api/PlaneSurface.html)   | `SdtfRhino3dmTypeGuard.assertPlaneSurface`<br/>`SdtfRhino3dmTypeGuard.isPlaneSurface`       |
| `"rhino.point"` or `SdtfRhino3dmTypeGuard.RHINO_POINT`                  | [Point](https://mcneel.github.io/rhino3dm/javascript/api/Point.html)                 | `SdtfRhino3dmTypeGuard.assertPoint`<br/>`SdtfRhino3dmTypeGuard.isPoint`                     |
| `"rhino.polycurve"` or `SdtfRhino3dmTypeGuard.RHINO_POLY_CURVE`         | [PolyCurve](https://mcneel.github.io/rhino3dm/javascript/api/PolyCurve.html)         | `SdtfRhino3dmTypeGuard.assertPolyCurve`<br/>`SdtfRhino3dmTypeGuard.isPolyCurve`             |
| `"rhino.polylinecurve"` or `SdtfRhino3dmTypeGuard.RHINO_POLYLINE_CURVE` | [PolylineCurve](https://mcneel.github.io/rhino3dm/javascript/api/PolylineCurve.html) | `SdtfRhino3dmTypeGuard.assertPolylineCurve`<br/>`SdtfRhino3dmTypeGuard.isPolylineCurve`     |
| `"rhino.revsurface"` or `SdtfRhino3dmTypeGuard.RHINO_REV_SURFACE`       | [RevSurface](https://mcneel.github.io/rhino3dm/javascript/api/RevSurface.html)       | `SdtfRhino3dmTypeGuard.assertRevSurface`<br/>`SdtfRhino3dmTypeGuard.isRevSurface`           |
| `"rhino.subd"` or `SdtfRhino3dmTypeGuard.RHINO_SUBD`                    | [SubD](https://mcneel.github.io/rhino3dm/javascript/api/SubD.html)                   | `SdtfRhino3dmTypeGuard.assertSubD`<br/>`SdtfRhino3dmTypeGuard.isSubD`                       |
| `"rhino.surface"` or `SdtfRhino3dmTypeGuard.RHINO_SURFACE`              | [Surface](https://mcneel.github.io/rhino3dm/javascript/api/Surface.html)             | `SdtfRhino3dmTypeGuard.assertSurface`<br/>`SdtfRhino3dmTypeGuard.isSurface`                 |

## Example
This example creates a new sdTF file that contains two rhino3dm point-objects.
Afterward, the created sdTF file is parsed and both points are extracted.
Since the extracted points are of type `unknown`, a type guard function is used to check and infer the content type to `Point`.
```typescript
// index.ts
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from "@shapediver/sdk.sdtf-rhino3dm"
import { create, SdtfRhinoTypeHintName, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { RhinoModule } from "rhino3dm"

(async () => {
    const sdk: SdtfSdk = await create({
        integrations: [ new SdtfRhino3dmTypeIntegration() ],
    })

    const rhino: RhinoModule = await require("rhino3dm")()      // Initialize the rhino3dm library
    const constructor = sdk.createConstructor()

    // Create a simple sdTF structure that contains two rhino3dm point-components
    const writeableAsset = constructor
        .getWriter()
        .createSimpleDataSdtf("points", [
            { content: new rhino.Point([ 1, 2, 3 ]), typeHint: SdtfRhinoTypeHintName.RHINO_POINT },
            { content: new rhino.Point([ 4, 5, 6 ]), typeHint: SdtfRhinoTypeHintName.RHINO_POINT },
        ])

    // Creates a new sdTF file from the writeable-asset.
    //
    // Note:
    //   The integration compresses the rhino3dm components and writes them into the binary buffer to reduce the overall size.
    //   When the file is parsed later on, the integration instantiates and returns new rhino3dm components.
    const sdTF = constructor.createBinarySdtf(writeableAsset)

    // sdTF - JSON content:
    // {
    //     "asset": {
    //         "generator": "ShapeDiverSdtfWriter",
    //         "version": "1.0"
    //     },
    //     "chunks": [
    //         {
    //             "items": [ 0, 1 ],
    //             "name": "points"
    //         }
    //     ],
    //     "nodes": [],
    //     "items": [
    //         {
    //             "accessor": 0,
    //             "typeHint": 0
    //         },
    //         {
    //             "accessor": 1,
    //             "typeHint": 0
    //         }
    //     ],
    //     "attributes": [],
    //     "typeHints": [
    //         { "name": "rhino.point" }
    //     ],
    //     "accessors": [
    //         {
    //             "bufferView": 0,
    //             "id": "ddd41af3-a02a-4c07-eacb-02627113ef65"
    //         },
    //         {
    //             "bufferView": 0,
    //             "id": "b086ae7c-e0cd-45c4-aa58-5a2aead343f6"
    //         }
    //     ],
    //     "bufferViews": [
    //         {
    //             "buffer": 0,
    //             "byteLength": 949,
    //             "byteOffset": 0,
    //             "contentEncoding": "gzip",
    //             "contentType": "model/vnd.3dm"
    //         }
    //     ],
    //     "buffers": [
    //         { "byteLength": 952 }
    //     ]
    // }

    // Reads the previously created sdTF file
    const readableAsset = sdk.createParser().readFromBuffer(sdTF)

    const point1 = await readableAsset.items[0].getContent()    // load first point of type `unknown`
    SdtfRhino3dmTypeGuard.assertPoint(point1)                   // infer the type to `Point`; throws if not possible
    point1.scale(5)                                             // manipulate point

    const point2 = await readableAsset.items[1].getContent()    // load second point of type `unknown`
    SdtfRhino3dmTypeGuard.assertPoint(point2)                   // infer the type to `Point`; throws if not possible
    point1.scale(3)                                             // manipulate point
})()
```

## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/LICENSE).
