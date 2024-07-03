import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from '../../src';
import { SdtfRhino3dmSingleton } from '../../src';

describe('type nurbs-curve', function () {
    let sdk: SdtfSdk;

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfRhino3dmTypeIntegration()] });
    });

    test('read example file; should return valid rhino component instance', async () => {
        await SdtfRhino3dmSingleton.init();
        const asset = await sdk.createParser().readFromFile('./test_data/rhinoTypesGzipped.sdtf');
        const content = await asset.items[16].getContent();
        expect(content).toBeDefined();
        expect(typeof content).toBe('object');
        SdtfRhino3dmTypeGuard.assertCurve(content);
        SdtfRhino3dmTypeGuard.assertNurbsCurve(content);
    });

    test('create sdTF, read and extract content; should return valid rhino component instance', async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance();
        const constructor = sdk.createConstructor();

        // @ts-ignore
        const content = rhino.NurbsCurve.createFromCircle(new rhino.Circle(5));
        expect(content.isValid).toBeTruthy();

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfRhinoTypeHintName.RHINO_NURBS_CURVE,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined();
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined();

        const contentInstance = await readableAsset.items[0].getContent();
        SdtfRhino3dmTypeGuard.assertCurve(contentInstance);
        SdtfRhino3dmTypeGuard.assertNurbsCurve(contentInstance);
    });
});
