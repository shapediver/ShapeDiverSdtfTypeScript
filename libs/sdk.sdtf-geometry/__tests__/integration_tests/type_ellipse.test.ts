import {
    ISdtfReadableContentComponent,
    SdtfGeometryTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import {
    SdtfGeometryEllipseType,
    SdtfGeometryTypeGuard,
    SdtfGeometryTypeIntegration,
} from '../../src';

describe('type ellipse', function () {
    let sdk: SdtfSdk;
    const content: SdtfGeometryEllipseType = {
        plane: [
            [1.0, 2.0, 3.0],
            [0.0, 0.0, 1.0],
            [1.0, 0.0, 0.0],
        ],
        r1: 2.0,
        r2: 3.0,
    };

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfGeometryTypeIntegration()] });
    });

    test('read and get content; should not throw', async () => {
        const asset = await sdk.createParser().readFromFile('./test_data/geometry_ellipse.sdtf');
        const data = await asset.items[0].getContent();
        expect(data).toStrictEqual(content);
        SdtfGeometryTypeGuard.assertEllipse(data);
    });

    test('create via writer; should contain value', () => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE,
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
