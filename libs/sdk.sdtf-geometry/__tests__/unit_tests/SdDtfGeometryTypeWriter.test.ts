import { ISdDtfWriteableAttribute, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-v1/src/writer/SdDtfWriteableComponentFactory"
import { SdDtfGeometryTypeValidator } from "../../src/SdDtfGeometryTypeValidator"
import { SdDtfGeometryTypeWriter } from "../../src/SdDtfGeometryTypeWriter"

const factory = new SdDtfWriteableComponentFactory()
const writer = new SdDtfGeometryTypeWriter(factory)

describe("writeComponent", function () {

    let origValidateComponent: any

    beforeAll(() => {
        origValidateComponent = SdDtfGeometryTypeValidator.prototype.validateComponent
    })

    afterAll(() => {
        SdDtfGeometryTypeValidator.prototype.validateComponent = origValidateComponent
    })

    test("invalid component; should throw", () => {
        // Mock
        SdDtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(() => writer.writeComponent({})).toThrow()
    })

    test("unsupported type hint name; should throw", () => {
        // Mock
        SdDtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(() => writer.writeComponent({})).toThrow()
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
    ])("component of type %s; should remove accessor component", (typeHintName) => {
        // Mock
        SdDtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeDefined()
        expect(component.accessor).toBeUndefined()
    })

})
