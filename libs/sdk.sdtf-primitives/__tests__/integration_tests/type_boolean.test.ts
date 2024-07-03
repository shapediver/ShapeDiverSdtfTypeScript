import {
    ISdtfReadableContentComponent,
    SdtfPrimitiveTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import { SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from '../../src';

describe('type boolean', function () {
    let sdk: SdtfSdk;
    const content: boolean = true;

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfPrimitiveTypeIntegration()] });
    });

    test('read and get content; should not throw', async () => {
        const asset = await sdk.createParser().readFromFile('./test_data/boolean.sdtf');
        const data = await asset.items[0].getContent();
        expect(data).toBe(content);
        SdtfPrimitiveTypeGuard.assertBoolean(data);
    });

    test('create via writer; should contain value', () => {
        const constructor = sdk.createConstructor();
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfPrimitiveTypeHintName.BOOLEAN,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        const item = readableAsset.items[0] as ISdtfReadableContentComponent;
        expect(SdtfPrimitiveTypeGuard.isBooleanType(item.typeHint?.name)).toBeTruthy();
        expect(item.value).toBe(content);
        expect(item.accessor).toBeUndefined();
    });
});
