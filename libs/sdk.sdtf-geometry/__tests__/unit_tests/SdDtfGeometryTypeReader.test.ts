import {
    ISdDtfReadableContentComponent,
    ISdDtfReadableTypeHint,
    SdDtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfGeometryTypeReader } from "../../src/SdDtfGeometryTypeReader"
import { SdDtfGeometryTypeValidator } from "../../src/SdDtfGeometryTypeValidator"

const reader = new SdDtfGeometryTypeReader()

describe("readComponent", function () {

    let origValidateComponent: any

    beforeAll(() => {
        origValidateComponent = SdDtfGeometryTypeValidator.prototype.validateComponent
    })

    afterAll(() => {
        SdDtfGeometryTypeValidator.prototype.validateComponent = origValidateComponent
    })

    test("invalid component; should throw", async () => {
        // Mock
        SdDtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test("unsupported type hint name; should throw", async () => {
        // Mock
        SdDtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test.each([
        SdDtfGeometryTypeHintName.GEOMETRY_ARC,
        SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX,
        SdDtfGeometryTypeHintName.GEOMETRY_BOX,
        SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE,
        SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX,
        SdDtfGeometryTypeHintName.GEOMETRY_CONE,
        SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER,
        SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE,
        SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL,
        SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2,
        SdDtfGeometryTypeHintName.GEOMETRY_LINE,
        SdDtfGeometryTypeHintName.GEOMETRY_MATRIX,
        SdDtfGeometryTypeHintName.GEOMETRY_PLANE,
        SdDtfGeometryTypeHintName.GEOMETRY_POINT,
        SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE,
        SdDtfGeometryTypeHintName.GEOMETRY_RAY,
        SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE,
        SdDtfGeometryTypeHintName.GEOMETRY_SPHERE,
        SdDtfGeometryTypeHintName.GEOMETRY_TORUS,
        SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM,
        SdDtfGeometryTypeHintName.GEOMETRY_VECTOR,
    ])("component of type %s; should return value", async (typeHintName) => {
        // Mock
        SdDtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdDtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe("value")
    })

})
