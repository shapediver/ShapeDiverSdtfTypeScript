import {
    ISdtfReadableContentComponent,
    ISdtfReadableTypeHint,
    SdtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdtfGeometryTypeReader } from "../../src/SdtfGeometryTypeReader"
import { SdtfGeometryTypeValidator } from "../../src/SdtfGeometryTypeValidator"

const reader = new SdtfGeometryTypeReader()

describe("readComponent", function () {

    let origValidateComponent: any

    beforeAll(() => {
        origValidateComponent = SdtfGeometryTypeValidator.prototype.validateComponent
    })

    afterAll(() => {
        SdtfGeometryTypeValidator.prototype.validateComponent = origValidateComponent
    })

    test("invalid component; should throw", async () => {
        // Mock
        SdtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test("unsupported type hint name; should throw", async () => {
        // Mock
        SdtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test.each([
        SdtfGeometryTypeHintName.GEOMETRY_ARC,
        SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX,
        SdtfGeometryTypeHintName.GEOMETRY_BOX,
        SdtfGeometryTypeHintName.GEOMETRY_CIRCLE,
        SdtfGeometryTypeHintName.GEOMETRY_COMPLEX,
        SdtfGeometryTypeHintName.GEOMETRY_CONE,
        SdtfGeometryTypeHintName.GEOMETRY_CYLINDER,
        SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE,
        SdtfGeometryTypeHintName.GEOMETRY_INTERVAL,
        SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2,
        SdtfGeometryTypeHintName.GEOMETRY_LINE,
        SdtfGeometryTypeHintName.GEOMETRY_MATRIX,
        SdtfGeometryTypeHintName.GEOMETRY_PLANE,
        SdtfGeometryTypeHintName.GEOMETRY_POINT,
        SdtfGeometryTypeHintName.GEOMETRY_POLYLINE,
        SdtfGeometryTypeHintName.GEOMETRY_RAY,
        SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE,
        SdtfGeometryTypeHintName.GEOMETRY_SPHERE,
        SdtfGeometryTypeHintName.GEOMETRY_TORUS,
        SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM,
        SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM_LIST,
        SdtfGeometryTypeHintName.GEOMETRY_VECTOR,
    ])("component of type %s; should return value", async (typeHintName) => {
        // Mock
        SdtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe("value")
    })

})
