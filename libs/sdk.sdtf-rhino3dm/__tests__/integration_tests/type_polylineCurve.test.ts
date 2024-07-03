import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from '@shapediver/sdk.sdtf-core';
import { create, SdtfSdk } from '../../../../packages/sdk.sdtf-v1';
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from '../../src';
import { SdtfRhino3dmSingleton } from '../../src';

describe('type polyline-curve', function () {
    let sdk: SdtfSdk;

    beforeAll(async () => {
        sdk = await create({ integrations: [new SdtfRhino3dmTypeIntegration()] });
    });

    test('create sdTF, read and extract content; should return valid rhino component instance', async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance();
        const constructor = sdk.createConstructor();

        const pointList = new rhino.Point3dList(3);
        pointList.add(0, 0, 0);
        pointList.add(1, 1, 1);
        pointList.add(2, 2, 2);
        // @ts-ignore
        const content = new rhino.PolylineCurve(pointList);
        expect(content.isValid).toBeTruthy();

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf('', [
            {
                content,
                typeHint: SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE,
            },
        ]);
        const sdTF = constructor.createBinarySdtf(writeableAsset);
        const readableAsset = sdk.createParser().readFromBuffer(sdTF);
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined();
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined();

        const contentInstance = await readableAsset.items[0].getContent();
        SdtfRhino3dmTypeGuard.assertCurve(contentInstance);
        SdtfRhino3dmTypeGuard.assertPolylineCurve(contentInstance);
    });
});
