import {
    ISdtfReadableContentComponent,
    SdtfGeometryTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import {
    SdtfGeometryTransformListType,
    SdtfGeometryTypeGuard,
    SdtfGeometryTypeIntegration,
} from '../../src';

describe('type transform-list', function () {
    let sdk: SdtfSdk;
    const content: SdtfGeometryTransformListType = [
        [
            [0.0, 1.0, 0.0, 0.0],
            [-1.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ],
        [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 10.0, 1.0],
        ],
    ];

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfGeometryTypeIntegration()] });
    });

    test('read and get content; should not throw', async () => {
        const asset = await sdk
            .createParser()
            .readFromFile('./test_data/geometry_transformlist.sdtf');
        const data = await asset.attributes[0].entries['transform'].getContent();
        expect(data).toStrictEqual(content);
        SdtfGeometryTypeGuard.assertTransformList(data);
    });

    test('create via writer; should contain value', () => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM_LIST,
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
