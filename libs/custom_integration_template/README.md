<p align="center">
  <a href="https://www.shapediver.com/">
    <img src="https://sduse1-assets.shapediver.com/production/assets/img/navbar_logo.png" alt="ShapeDiver" width="392" />
  </a>
</p>

# Template
This package contains a simple, minimalistic template for a custom sdTF integration.

Custom sdTF integrations allow to process data with specific type hints in a more sophisticated way.
They can be added to the sdTF SDK on demand to enable advanced reading and writing capabilities.
This allows to process, map and validate content data to improve user experience or to optimize sdTF components.

Every integration must implement the following three central components:
* [SdtfCustomTypeIntegration](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/libs/custom_integration_template/src/SdtfCustomTypeIntegration.ts)
* [SdtfCustomTypeReader](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/libs/custom_integration_template/src/SdtfCustomTypeReader.ts)
* [SdtfCustomTypeWriter](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/libs/custom_integration_template/src/SdtfCustomTypeWriter.ts)

The custom integration can then be easily registered in a new [SDK](https://www.npmjs.com/package/@shapediver/sdk.sdtf-v1) instance.
```typescript
const sdk = await create({
    integrations: [
        // Instantiate your integration here to add it to the SDK
    ]
})
```

## Support
If you have questions, please use the [ShapeDiver Help Center](https://help.shapediver.com/).

You can find out more about ShapeDiver [right here](https://www.shapediver.com/).

## Licensing
This project is released under the [MIT License](https://github.com/shapediver/ShapeDiverSdtfTypeScript/blob/master/LICENSE).

