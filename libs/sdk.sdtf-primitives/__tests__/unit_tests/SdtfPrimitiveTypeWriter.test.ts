import { ISdtfWriteableAttribute, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-v1/src/writer/SdtfWriteableComponentFactory"
import { SdtfPrimitiveTypeValidator } from "../../src/SdtfPrimitiveTypeValidator"
import { SdtfPrimitiveTypeWriter } from "../../src/SdtfPrimitiveTypeWriter"

const factory = new SdtfWriteableComponentFactory()
const writer = new SdtfPrimitiveTypeWriter(factory)

describe("writeComponent", function () {

    let origValidateComponent: any

    beforeAll(() => {
        origValidateComponent = SdtfPrimitiveTypeValidator.prototype.validateComponent
    })

    afterAll(() => {
        SdtfPrimitiveTypeValidator.prototype.validateComponent = origValidateComponent
    })

    test("invalid component; should throw", () => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(() => writer.writeComponent({})).toThrow()
    })

    test("unsupported type hint name; should throw", () => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(() => writer.writeComponent({})).toThrow()
    })

    test.each([
        SdtfPrimitiveTypeHintName.BOOLEAN,
        SdtfPrimitiveTypeHintName.CHAR,
        SdtfPrimitiveTypeHintName.COLOR,
        SdtfPrimitiveTypeHintName.DECIMAL,
        SdtfPrimitiveTypeHintName.DOUBLE,
        SdtfPrimitiveTypeHintName.GUID,
        SdtfPrimitiveTypeHintName.INT8,
        SdtfPrimitiveTypeHintName.INT16,
        SdtfPrimitiveTypeHintName.INT32,
        SdtfPrimitiveTypeHintName.INT64,
        SdtfPrimitiveTypeHintName.SINGLE,
        SdtfPrimitiveTypeHintName.STRING,
        SdtfPrimitiveTypeHintName.UINT8,
        SdtfPrimitiveTypeHintName.UINT16,
        SdtfPrimitiveTypeHintName.UINT32,
        SdtfPrimitiveTypeHintName.UINT64,
    ])("component of type %s; should remove accessor component", (typeHintName) => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeDefined()
        expect(component.accessor).toBeUndefined()
    })

    test.each([
        SdtfPrimitiveTypeHintName.DATA,
        SdtfPrimitiveTypeHintName.IMAGE,
    ])("component of type %s; should remove value component", (typeHintName) => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeUndefined()
        expect(component.accessor).toBeDefined()
    })

})
