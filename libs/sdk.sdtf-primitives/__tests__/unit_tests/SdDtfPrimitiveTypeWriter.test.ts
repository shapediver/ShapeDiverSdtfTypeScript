import { ISdDtfWriteableAttribute, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-v1/dist/writer/SdDtfWriteableComponentFactory"
import { SdDtfPrimitiveTypeValidator } from "../../src/SdDtfPrimitiveTypeValidator"
import { SdDtfPrimitiveTypeWriter } from "../../src/SdDtfPrimitiveTypeWriter"

const factory = new SdDtfWriteableComponentFactory()
const writer = new SdDtfPrimitiveTypeWriter(factory)

describe("writeComponent", function () {

    let origValidateComponent: any, origCopyDataToBuffer: any

    beforeAll(() => {
        origValidateComponent = SdDtfPrimitiveTypeValidator.prototype.validateComponent

        origCopyDataToBuffer = SdDtfPrimitiveTypeWriter.prototype.copyDataToBuffer
        SdDtfPrimitiveTypeWriter.prototype.copyDataToBuffer = jest.fn((c) => c.accessor = factory.createAccessor())
    })

    afterAll(() => {
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = origValidateComponent
        SdDtfPrimitiveTypeWriter.prototype.copyDataToBuffer = origCopyDataToBuffer
    })

    test("invalid component; should throw", async () => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(async () => writer.writeComponent({})).rejects.toThrow()
    })

    test("unsupported type hint name; should throw", async () => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(async () => writer.writeComponent({})).rejects.toThrow()
    })

    test.each([
        SdDtfPrimitiveTypeHintName.BOOLEAN,
        SdDtfPrimitiveTypeHintName.CHAR,
        SdDtfPrimitiveTypeHintName.COLOR,
        SdDtfPrimitiveTypeHintName.DECIMAL,
        SdDtfPrimitiveTypeHintName.DOUBLE,
        SdDtfPrimitiveTypeHintName.GUID,
        SdDtfPrimitiveTypeHintName.INT8,
        SdDtfPrimitiveTypeHintName.INT16,
        SdDtfPrimitiveTypeHintName.INT32,
        SdDtfPrimitiveTypeHintName.INT64,
        SdDtfPrimitiveTypeHintName.SINGLE,
        SdDtfPrimitiveTypeHintName.STRING,
        SdDtfPrimitiveTypeHintName.UINT8,
        SdDtfPrimitiveTypeHintName.UINT16,
        SdDtfPrimitiveTypeHintName.UINT32,
        SdDtfPrimitiveTypeHintName.UINT64,
    ])("component of type %s; should remove accessor component", (typeHintName) => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeDefined()
        expect(component.accessor).toBeUndefined()
    })

    test.each([
        SdDtfPrimitiveTypeHintName.DATA,
        SdDtfPrimitiveTypeHintName.IMAGE,
    ])("component of type %s; should remove value component", (typeHintName) => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeUndefined()
        expect(component.accessor).toBeDefined()
    })

    test.each([
        SdDtfPrimitiveTypeHintName.DATA,
        SdDtfPrimitiveTypeHintName.IMAGE,
    ])("component of type %s without accessor; should move value content into accessor", (typeHintName) => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfWriteableAttribute = {
            typeHint: factory.createTypeHint(typeHintName),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeUndefined()
        expect(component.accessor).toBeDefined()    // is created by mock
    })

})

describe("copyDataToBuffer", function () {

    test("value not an array buffer; should throw", () => {
        expect(() => writer.copyDataToBuffer({ value: "foobar" })).toThrow()
    })

    test("value is array buffer; should create accessor/bufferView/buffer to hold content", () => {
        const component: ISdDtfWriteableAttribute = { value: new ArrayBuffer(123) }
        writer.copyDataToBuffer(component)

        expect(component.accessor).toBeDefined()
        expect(component.accessor!.bufferView).toBeDefined()
        expect(component.accessor!.bufferView!.buffer).toBeDefined()
        expect(component.accessor!.bufferView!.buffer!.data).toStrictEqual(component.value)
    })

})
