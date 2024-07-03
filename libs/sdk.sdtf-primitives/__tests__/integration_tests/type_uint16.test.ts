import {
    ISdtfReadableContentComponent,
    SdtfPrimitiveTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import { SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from '../../src';

describe('type uint16', function () {
    let sdk: SdtfSdk;
    const content: number = 42;

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfPrimitiveTypeIntegration()] });
    });

    test('read and get content; should not throw', async () => {
        const asset = await sdk.createParser().readFromFile('./test_data/uint16.sdtf');
        const data = await asset.items[0].getContent();
        expect(data).toBe(content);
        SdtfPrimitiveTypeGuard.assertNumber(data);
    });

    test('create via writer; should contain value', () => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfPrimitiveTypeHintName.UINT16,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        const item = readableAsset.items[0] as ISdtfReadableContentComponent;
        expect(SdtfPrimitiveTypeGuard.isNumberType(item.typeHint?.name)).toBeTruthy();
        expect(item.value).toBe(content);
        expect(item.accessor).toBeUndefined();
    });
});
