<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# Structured Data Transfer Format - Integration for geometry types
The _Structured Data Transfer Format_ (sdTF) is an API-neutral exchange and storage format for trees of data items as used by parametric 3D modeling software like Grasshopper®.
This open, efficient, and easily extensible data format enables the exchange of complex data structures, independent of software vendors.
See the [sdTF documentation](https://github.com/shapediver/sdTF/tree/development/specification/1.0) for more details.

The aim of this package is to extend the [sdTF-v1](https://www.npmjs.com/package/@shapediver/sdk.sdtf-v1) module to provide processing and typing functionality for geometric data.

It can be used in [Node.js](https://nodejs.org/en/) and modern Browsers, and exposes the respective TypeScript declarations.

## Installation
```shell
npm i @shapediver/sdk.sdtf-v1 @shapediver/sdk.sdtf-geometry
```

This package is a plugin for the [sdTF-v1](https://www.npmjs.com/package/@shapediver/sdk.sdtf-v1) module and cannot be used by itself.

## Usage
This code initializes the SDK and registers the integration for geometry types.
After this step, the integration is fully included in all reading and writing processes of the SDK instance.

```typescript
// index.ts
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdtfGeometryTypeIntegration } from "@shapediver/sdk.sdtf-geometry"

(async () => {
    const sdk: SdtfSdk = await create({
        integrations: [ new SdtfGeometryTypeIntegration() ]
    })

    // Use the sdk here
})()
```

## Supported types
The following table lists all [type hints](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehintname-white_check_mark) that are supported by this integration, their specific _TypeScript types_, and the provided _type guard functions_ that can be used to infer a data content type.

| Type hint name                                                               | TypeScript type                  | Type guard                                                                                |
|------------------------------------------------------------------------------|----------------------------------|-------------------------------------------------------------------------------------------|
| `"geometry.arc"` or `SdtfGeometryTypeHintName.GEOMETRY_ARC`                  | `SdtfGeometryArcType`            | `SdtfGeometryTypeHintName.assertArc`<br/>`SdtfGeometryTypeHintName.isArc`                 |
| `"geometry.boundingbox"` or `SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX` | `SdtfGeometryBoundingBoxType`    | `SdtfGeometryTypeHintName.assertBoundingBox`<br/>`SdtfGeometryTypeHintName.isBoundingBox` |
| `"geometry.box"` or `SdtfGeometryTypeHintName.GEOMETRY_BOX`                  | `SdtfGeometryBoxType`            | `SdtfGeometryTypeHintName.assertBox`<br/>`SdtfGeometryTypeHintName.isBox`                 |
| `"geometry.circle"` or `SdtfGeometryTypeHintName.GEOMETRY_CIRCLE`            | `SdtfGeometryCircleType`         | `SdtfGeometryTypeHintName.assertCircle`<br/>`SdtfGeometryTypeHintName.isCircle`           |
| `"geometry.complex"` or `SdtfGeometryTypeHintName.GEOMETRY_COMPLEX`          | `SdtfGeometryComplexType`        | `SdtfGeometryTypeHintName.assertComplex`<br/>`SdtfGeometryTypeHintName.isComplex`         |
| `"geometry.cone"` or `SdtfGeometryTypeHintName.GEOMETRY_CONE`                | `SdtfGeometryConeType`           | `SdtfGeometryTypeHintName.assertCone`<br/>`SdtfGeometryTypeHintName.isCone`               |
| `"geometry.cylinder"` or `SdtfGeometryTypeHintName.GEOMETRY_CYLINDER`        | `SdtfGeometryCylinderType`       | `SdtfGeometryTypeHintName.assertCylinder`<br/>`SdtfGeometryTypeHintName.isCylinder`       |
| `"geometry.ellipse"` or `SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE`          | `SdtfGeometryEllipseType`        | `SdtfGeometryTypeHintName.assertEllipse`<br/>`SdtfGeometryTypeHintName.isEllipse`         |
| `"geometry.interval"` or `SdtfGeometryTypeHintName.GEOMETRY_INTERVAL`        | `SdtfGeometryIntervalType`       | `SdtfGeometryTypeHintName.assertInterval`<br/>`SdtfGeometryTypeHintName.isInterval`       |
| `"geometry.interval2"` or `SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2`      | `SdtfGeometryInterval2Type`      | `SdtfGeometryTypeHintName.assertInterval2`<br/>`SdtfGeometryTypeHintName.isInterval2`     |
| `"geometry.line"` or `SdtfGeometryTypeHintName.GEOMETRY_LINE`                | `SdtfGeometryLineType`           | `SdtfGeometryTypeHintName.assertLine`<br/>`SdtfGeometryTypeHintName.isLine`               |
| `"geometry.matrix"` or `SdtfGeometryTypeHintName.GEOMETRY_MATRIX`            | `SdtfGeometryMatrixType`         | `SdtfGeometryTypeHintName.assertMatrix`<br/>`SdtfGeometryTypeHintName.isMatrix`           |
| `"geometry.plane"` or `SdtfGeometryTypeHintName.GEOMETRY_PLANE`              | `SdtfGeometryPlaneType`          | `SdtfGeometryTypeHintName.assertPlane`<br/>`SdtfGeometryTypeHintName.isPlane`             |
| `"geometry.point"` or `SdtfGeometryTypeHintName.GEOMETRY_POINT`              | `SdtfGeometryPointType`          | `SdtfGeometryTypeHintName.assertPoint`<br/>`SdtfGeometryTypeHintName.isPoint`             |
| `"geometry.polyline"` or `SdtfGeometryTypeHintName.GEOMETRY_POLYLINE`        | `SdtfGeometryPolylineType`       | `SdtfGeometryTypeHintName.assertPolyline`<br/>`SdtfGeometryTypeHintName.isPolyline`       |
| `"geometry.ray"` or `SdtfGeometryTypeHintName.GEOMETRY_RAY`                  | `SdtfGeometryRayType`            | `SdtfGeometryTypeHintName.assertRay`<br/>`SdtfGeometryTypeHintName.isRay`                 |
| `"geometry.rectangle"` or `SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE`      | `SdtfGeometryRectangleType`      | `SdtfGeometryTypeHintName.assertRectangle`<br/>`SdtfGeometryTypeHintName.isRectangle`     |
| `"geometry.sphere"` or `SdtfGeometryTypeHintName.GEOMETRY_SPHERE`            | `SdtfGeometrySphereType`         | `SdtfGeometryTypeHintName.assertSphere`<br/>`SdtfGeometryTypeHintName.assertSphere`       |
| `"geometry.torus"` or `SdtfGeometryTypeHintName.GEOMETRY_TORUS`              | `SdtfGeometryTorusType`          | `SdtfGeometryTypeHintName.assertTorus`<br/>`SdtfGeometryTypeHintName.isTorus`             |
| `"geometry.transform"` or `SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM`      | `SdtfGeometryTransformType`      | `SdtfGeometryTypeHintName.assertTransform`<br/>`SdtfGeometryTypeHintName.isTransform`     |
| `"geometry.vector"` or `SdtfGeometryTypeHintName.GEOMETRY_VECTOR`            | `SdtfGeometryVectorType`         | `SdtfGeometryTypeHintName.assertVector`<br/>`SdtfGeometryTypeHintName.isVector`           |

Additionally, the type guard `SdtfGeometryTypeHintName` provides functions to infer subtypes of `SdtfGeometryPointType` and `SdtfGeometryVectorType`:

__typeGuard.assertPoint2d__ and __typeGuard.isPoint2d__:\
Infer the subtype `SdtfGeometryPoint2d` of `SdtfGeometryPointType`.

__typeGuard.assertPoint3d__ and __typeGuard.isPoint3d__:\
Infer the subtype `SdtfGeometryPoint3d` of `SdtfGeometryPointType`.

__typeGuard.assertPoint4d__ and __typeGuard.isPoint4d__:\
Infer the subtype `SdtfGeometryPoint4d` of `SdtfGeometryPointType`.

__typeGuard.assertVector2d__ and __typeGuard.isVector2d__:\
Infer the subtype `SdtfGeometryVector2d` of `SdtfGeometryVectorType`.

__typeGuard.assertVector3d__ and __typeGuard.isVector3d__:\
Infer the subtype `SdtfGeometryVector3d` of `SdtfGeometryVectorType`.

## Example
This simple example reads a sdTF file and extracts the content of all [data items](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item).
Every content data that is of a cylindrical or spherical type is scaled up and shown on the console.
```typescript
// index.ts
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdtfGeometryTypeIntegration, SdtfGeometryTypeGuard } from "@shapediver/sdk.sdtf-geometry"

(async () => {
    const sdk: SdtfSdk = await create({
        integrations: [ new SdtfGeometryTypeIntegration() ]
    })

    // Reads a sdTF file
    const asset = await sdk.createParser().readFromFile("./test.sdtf")

    // Process all data items with a cylindrical or spherical content
    for (const dataItem of asset.items) {
        const geometry = await dataItem.getContent()            // load data content of type `unknown`

        if (SdtfGeometryTypeGuard.isCylinder(geometry)) {       // checks and infers the type to `SdtfGeometryCylinderType`
            geometry.baseCircle.radius *= 5
        }
        else if (SdtfGeometryTypeGuard.isSphere(geometry)) {    // checks and infers the type to `SdtfGeometrySphereType`
            geometry.radius *= 7
        }
        else {
            continue
        }

        console.log("The scaled geometry is", geometry)         // Print out the scaled geometry information
    }
})()
```

## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/LICENSE).
