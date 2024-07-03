import {
    ISdtfReadableContentComponent,
    SdtfPrimitiveTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import {
    SdtfPrimitiveJsonType,
    SdtfPrimitiveTypeGuard,
    SdtfPrimitiveTypeIntegration,
} from '../../src';

describe('type json', function () {
    let sdk: SdtfSdk;
    const contentObj: SdtfPrimitiveJsonType = {
        foo: 'text',
        bar: [1, 2, 3],
        baz: 1,
        qux: false,
    };
    const contentArr: SdtfPrimitiveJsonType = {
        foo: 'text',
        bar: [1, 2, 3],
        baz: 1,
        qux: false,
    };

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfPrimitiveTypeIntegration()] });
    });

    // TODO remove skip when the test_data file has been created via Grasshopper
    test.skip('read and get content; should not throw', async () => {
        const asset = await sdk.createParser().readFromFile('./test_data/json.sdtf');
        const data = await asset.items[0].getContent();
        expect(data).toStrictEqual(contentObj);
        SdtfPrimitiveTypeGuard.assertJson(data);
    });

    test('create via writer, content is object; should contain value', () => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content: contentObj,
                typeHint: SdtfPrimitiveTypeHintName.JSON,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        const item = readableAsset.items[0] as ISdtfReadableContentComponent;
        expect(SdtfPrimitiveTypeGuard.isJsonType(item.typeHint?.name)).toBeTruthy();
        expect(item.value).toStrictEqual(contentObj);
        expect(item.accessor).toBeUndefined();
    });

    test('create via writer, content is array; should contain value', () => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content: contentArr,
                typeHint: SdtfPrimitiveTypeHintName.JSON,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        const item = readableAsset.items[0] as ISdtfReadableContentComponent;
        expect(SdtfPrimitiveTypeGuard.isJsonType(item.typeHint?.name)).toBeTruthy();
        expect(item.value).toStrictEqual(contentArr);
        expect(item.accessor).toBeUndefined();
    });
});
