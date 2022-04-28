import { ISdtfWriteableAttribute, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-v1/src/writer/SdtfWriteableComponentFactory"
import { SdtfGeometryTypeValidator } from "../../src/SdtfGeometryTypeValidator"
import { SdtfGeometryTypeWriter } from "../../src/SdtfGeometryTypeWriter"

const factory = new SdtfWriteableComponentFactory()
const writer = new SdtfGeometryTypeWriter(factory)

describe("writeComponent", function () {

    let origValidateComponent: any

    beforeAll(() => {
        origValidateComponent = SdtfGeometryTypeValidator.prototype.validateComponent
    })

    afterAll(() => {
        SdtfGeometryTypeValidator.prototype.validateComponent = origValidateComponent
    })

    test("invalid component; should throw", () => {
        // Mock
        SdtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(() => writer.writeComponent({})).toThrow()
    })

    test("unsupported type hint name; should throw", () => {
        // Mock
        SdtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(() => writer.writeComponent({})).toThrow()
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
        SdtfGeometryTypeHintName.GEOMETRY_VECTOR,
    ])("component of type %s; should remove accessor component", (typeHintName) => {
        // Mock
        SdtfGeometryTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeDefined()
        expect(component.accessor).toBeUndefined()
    })

})
