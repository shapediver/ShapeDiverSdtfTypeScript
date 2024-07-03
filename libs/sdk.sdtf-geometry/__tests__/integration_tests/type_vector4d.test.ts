import {
    ISdtfReadableContentComponent,
    SdtfGeometryTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import {
    SdtfGeometryTypeGuard,
    SdtfGeometryTypeIntegration,
    SdtfGeometryVector4d,
} from '../../src';

describe('type vector4d', function () {
    let sdk: SdtfSdk;
    const content: SdtfGeometryVector4d = [1.0, 2.0, 3.0, 4.0];

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfGeometryTypeIntegration()] });
    });

    // TODO remove skip when the test_data file has been created via Grasshopper
    test.skip('read and get content; should not throw', async () => {
        const asset = await sdk.createParser().readFromFile('./test_data/geometry_vector4d.sdtf');
        const data = await asset.items[0].getContent();
        expect(data).toStrictEqual(content);
        SdtfGeometryTypeGuard.assertVector(data);
        SdtfGeometryTypeGuard.assertVector4d(data);
    });

    test.each([
        SdtfGeometryTypeHintName.GEOMETRY_VECTOR,
        SdtfGeometryTypeHintName.GEOMETRY_VECTOR4D,
    ])('%s, create via writer; should contain value', (typeHint) => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(
            content
        );
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined();
    });
});
