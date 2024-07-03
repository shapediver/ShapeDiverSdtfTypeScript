import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from '../../src';
import { SdtfRhino3dmSingleton } from '../../src';

describe('type nurbs-surface', function () {
    let sdk: SdtfSdk;

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfRhino3dmTypeIntegration()] });
    });

    test('read example file; should return valid rhino component instance', async () => {
        await SdtfRhino3dmSingleton.init();
        const asset = await sdk.createParser().readFromFile('./test_data/rhinoTypesGzipped.sdtf');
        const content = await asset.items[18].getContent();
        expect(content).toBeDefined();
        expect(typeof content).toBe('object');
        SdtfRhino3dmTypeGuard.assertSurface(content);
        SdtfRhino3dmTypeGuard.assertNurbsSurface(content);
    });

    test('create sdTF, read and extract content; should return valid rhino component instance', async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance();
        const constructor = sdk.createConstructor();

        const content = rhino.NurbsSurface.createFromSphere(new rhino.Sphere([1, 2, 3], 4));
        expect(content.isValid).toBeTruthy();

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfRhinoTypeHintName.RHINO_NURBS_SURFACE,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined();
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined();

        const contentInstance = await readableAsset.items[0].getContent();
        SdtfRhino3dmTypeGuard.assertSurface(contentInstance);
        SdtfRhino3dmTypeGuard.assertNurbsSurface(contentInstance);
    });
});
