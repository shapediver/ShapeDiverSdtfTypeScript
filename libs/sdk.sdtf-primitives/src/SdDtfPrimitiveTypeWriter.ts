import {
    ISdDtfWriteableAttribute,
    ISdDtfWriteableComponentFactory,
    ISdDtfWriteableDataItem,
    sdAssertUnreachable,
    SdDtfError,
    SdDtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeValidator } from "./SdDtfPrimitiveTypeValidator"

export class SdDtfPrimitiveTypeWriter {

    private readonly validator = new SdDtfPrimitiveTypeValidator()

    constructor (private factory: ISdDtfWriteableComponentFactory) {
    }

    writeComponent (component: ISdDtfWriteableAttribute | ISdDtfWriteableDataItem): void {
        const typeHint = component.typeHint?.name as SdDtfPrimitiveTypeHintName

        switch (typeHint) {
            case SdDtfPrimitiveTypeHintName.BOOLEAN:
            case SdDtfPrimitiveTypeHintName.CHAR:
            case SdDtfPrimitiveTypeHintName.COLOR:
            case SdDtfPrimitiveTypeHintName.DECIMAL:
            case SdDtfPrimitiveTypeHintName.DOUBLE:
            case SdDtfPrimitiveTypeHintName.GUID:
            case SdDtfPrimitiveTypeHintName.INT8:
            case SdDtfPrimitiveTypeHintName.INT16:
            case SdDtfPrimitiveTypeHintName.INT32:
            case SdDtfPrimitiveTypeHintName.INT64:
            case SdDtfPrimitiveTypeHintName.SINGLE:
            case SdDtfPrimitiveTypeHintName.STRING:
            case SdDtfPrimitiveTypeHintName.UINT8:
            case SdDtfPrimitiveTypeHintName.UINT16:
            case SdDtfPrimitiveTypeHintName.UINT32:
            case SdDtfPrimitiveTypeHintName.UINT64:
                delete component.accessor   // Stored in JSON content
                break
            case SdDtfPrimitiveTypeHintName.DATA:
            case SdDtfPrimitiveTypeHintName.IMAGE:
                if (!component.accessor) this.copyDataToBuffer(component)
                delete component.value      // Stored in sdTF buffer
                break
            default:
                sdAssertUnreachable(typeHint)
        }

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdDtfError(`Cannot write component of type '${ typeHint }': Invalid component.`)
        }
    }

    /**
     * Convenient function to increase usability of writer that allows users to store buffer data in the `value`
     * property instead of an accessor object.
     * This function
     * @private
     */
    copyDataToBuffer (component: ISdDtfWriteableAttribute | ISdDtfWriteableDataItem): void {
        // We only support array buffer data for now
        if (!(component.value instanceof ArrayBuffer)) {
            throw new SdDtfError(`Cannot write component of type '${ component.typeHint?.name }': Content not an ArrayBuffer.`)
        }

        // Create accessor/bufferView/buffer chain that holds the content
        component.accessor = this.factory.createAccessor(component.value)
    }

}
