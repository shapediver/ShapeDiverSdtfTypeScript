import {
    ISdtfReadableContentComponent,
    ISdtfReadableTypeHint,
    SdtfGrasshopperTypeHintName,
    SdtfRhinoTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfRhino3dmTypeConfig } from '../../src/SdtfRhino3dmTypeConfig';
import { SdtfRhino3dmTypeReader } from '../../src/SdtfRhino3dmTypeReader';
import { SdtfRhino3dmTypeValidator } from '../../src/SdtfRhino3dmTypeValidator';

const reader = new SdtfRhino3dmTypeReader(new SdtfRhino3dmTypeConfig());

describe('readComponent', function () {
    let origValidateInternalRepresentationOfComponent: any, origInstantiateRhinoComponent: any;
    const rhinoObject = 'FOOBAR';

    beforeAll(() => {
        origValidateInternalRepresentationOfComponent =
            SdtfRhino3dmTypeValidator.prototype.validateInternalRepresentationOfComponent;

        origInstantiateRhinoComponent = SdtfRhino3dmTypeReader.prototype.instantiateRhinoComponent;
        SdtfRhino3dmTypeReader.prototype.instantiateRhinoComponent = jest.fn(
            async () => rhinoObject
        );
    });

    afterAll(() => {
        SdtfRhino3dmTypeValidator.prototype.validateInternalRepresentationOfComponent =
            origValidateInternalRepresentationOfComponent;
        SdtfRhino3dmTypeReader.prototype.instantiateRhinoComponent = origInstantiateRhinoComponent;
    });

    test('invalid component; should throw', async () => {
        // Mock
        SdtfRhino3dmTypeValidator.prototype.validateInternalRepresentationOfComponent = jest.fn(
            () => false
        );

        expect(async () => reader.readComponent({})).rejects.toThrow();
    });

    test('unsupported type hint name; should throw', async () => {
        // Mock
        SdtfRhino3dmTypeValidator.prototype.validateInternalRepresentationOfComponent = jest.fn(
            () => true
        );

        expect(async () => reader.readComponent({})).rejects.toThrow();
    });

    test.each([SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH])(
        'grasshopper component of type %s; should return value',
        async (typeHintName) => {
            // Mock
            SdtfRhino3dmTypeValidator.prototype.validateInternalRepresentationOfComponent =
                jest.fn(() => true);

            let component: ISdtfReadableContentComponent = {
                typeHint: { name: typeHintName } as ISdtfReadableTypeHint,
                value: 'value',
            };

            expect(await reader.readComponent(component)).toBe('value');
        }
    );

    test.each([
        SdtfRhinoTypeHintName.RHINO_ARC_CURVE,
        SdtfRhinoTypeHintName.RHINO_BREP,
        SdtfRhinoTypeHintName.RHINO_CURVE,
        SdtfRhinoTypeHintName.RHINO_EXTRUSION,
        SdtfRhinoTypeHintName.RHINO_LINE_CURVE,
        SdtfRhinoTypeHintName.RHINO_MESH,
        SdtfRhinoTypeHintName.RHINO_NURBS_CURVE,
        SdtfRhinoTypeHintName.RHINO_NURBS_SURFACE,
        SdtfRhinoTypeHintName.RHINO_PLANE_SURFACE,
        SdtfRhinoTypeHintName.RHINO_POINT,
        SdtfRhinoTypeHintName.RHINO_POLY_CURVE,
        SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE,
        SdtfRhinoTypeHintName.RHINO_REV_SURFACE,
        SdtfRhinoTypeHintName.RHINO_SUBD,
        SdtfRhinoTypeHintName.RHINO_SURFACE,
    ])('rhino component of type %s; should return value', async (typeHintName) => {
        // Mock
        SdtfRhino3dmTypeValidator.prototype.validateInternalRepresentationOfComponent = jest.fn(
            () => true
        );

        let component: ISdtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdtfReadableTypeHint,
            value: 'value',
        };

        expect(await reader.readComponent(component)).toBe(rhinoObject);
    });
});
