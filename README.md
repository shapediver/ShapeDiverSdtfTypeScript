<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# Structured Data Transfer Format - SDK v1
The _Structured Data Transfer Format_ (sdTF) is an API-neutral exchange and storage format for trees of data items as used by parametric 3D modeling software like Grasshopper®.
This open, efficient, and easily extensible data format enables the exchange of complex data structures, independent of software vendors.
See the [sdTF documentation](https://github.com/shapediver/sdTF/tree/development/specification/1.0) for more details.

This project provides a TypeScript SDK to interact with sdTF data structures, as well as multiple [integrations](https://github.com/shapediver/ShapeDiverSdtfTypeScript#integrations).
These pluggable _integrations_ can be added to the SDK and provide a simple but powerful way to manage the mapping, validation and optimization of content data, leading to an improved user experience.
The following list gives a brief overview of the individual components:

* [SDK v1](https://github.com/shapediver/ShapeDiverSdtfTypeScript/tree/master/packages/sdk.sdtf-v1) - Provides an easy-to-use, lightweight, cross-platform library to interact with sdTF files.

* [Primitives Integration](https://github.com/shapediver/ShapeDiverSdtfTypeScript/tree/master/libs/sdk.sdtf-primitives) - Extends the sdTF SDK and adds support for various primitive types.

* [Geometry Integration](https://github.com/shapediver/ShapeDiverSdtfTypeScript/tree/master/libs/sdk.sdtf-geometry) - Extends the sdTF SDK and adds support for various geometry types.

* [Rhino3dm Integration](https://github.com/shapediver/ShapeDiverSdtfTypeScript/tree/master/libs/sdk.sdtf-rhino3dm) - Extends the sdTF SDK and adds support for [rhino3dm.js](https://www.npmjs.com/package/rhino3dm) components.

All listed JavaScript modules can be used in [Node.js](https://nodejs.org/en/) and modern Browsers, and are available through the [npm registry](https://www.npmjs.com/).

## Integrations
By itself, the SDK does not know about any data type hints.
It simply returns the data as is with type `unknown` and the responsibility of explicitly typing the data content is passed on to the user. 
However, in some cases it is necessary to process or validate the data content, before returning it to the user or before writing it to the sdTF.
That is where integrations come into play.

sdTF integrations allow to process data with specific type hints in a more sophisticated way.
They can be added to the sdTF SDK on demand to enable advanced reading and writing capabilities.
This allows to process, map and validate content data to improve user experience or to optimize sdTF components.

Each integration handles only content data of specific type hints.
The following integrations for common type hints have already been implemented and can be used when needed:
* [Primitive type integration](https://www.npmjs.com/package/@shapediver/sdk.sdtf-primitives)
* [Geometry type integration](https://www.npmjs.com/package/@shapediver/sdk.sdtf-geometry)
* [Rhino3dm type Integration](https://www.npmjs.com/package/@shapediver/sdk.sdtf-rhino3dm)

However, it is easily possible to implement new integrations of custom type hints.
This [template](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/libs/custom_integration_template/README.md) gives a brief overview of the required components and explains what is needed to start building a custom integration.

## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/LICENSE).
