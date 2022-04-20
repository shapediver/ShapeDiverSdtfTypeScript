import {
    ISdDtfBufferValue,
    ISdDtfReadableContentComponent,
    ISdDtfTypeReader,
    sdAssertUnreachable,
    SdDtfError,
    SdDtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeValidator } from "./SdDtfPrimitiveTypeValidator"

export class SdDtfPrimitiveTypeReader implements ISdDtfTypeReader {

    private readonly validator = new SdDtfPrimitiveTypeValidator()

    async readComponent (component: ISdDtfReadableContentComponent): Promise<unknown> {
        const typeHint = component.typeHint?.name as SdDtfPrimitiveTypeHintName

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdDtfError(`Cannot read value of type '${ typeHint }': Invalid component.`)
        }

        // Map the component data and return the result
        switch (typeHint) {
            case SdDtfPrimitiveTypeHintName.BOOLEAN:
            case SdDtfPrimitiveTypeHintName.CHAR:
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
                return component.value  // Nothing to map here
            case SdDtfPrimitiveTypeHintName.COLOR:
                return this.mapColor(component.value)
            case SdDtfPrimitiveTypeHintName.DATA:
            case SdDtfPrimitiveTypeHintName.IMAGE:
                return this.mapGenericData(await component.accessor?.getContent())
            default:
                sdAssertUnreachable(typeHint)
        }
    }

    /**
     * The internal representation of Color is either an array or a string (legacy).
     * Its external representation is a number-array.
     * @private
     */
    mapColor (content: unknown): unknown {
        let parts: number[]

        if (Array.isArray(content)) {
            // Handle regular color
            parts = content
        } else {
            // Handle legacy color: Map sdTF color string to array
            parts = (content as string).split(",").map(p => Number(p))
        }

        let res = [ ...parts ]

        // Default alpha content is `1`
        if (res.length === 3) res = [ ...parts, 1 ]

        return res
    }

    /**
     * Data content is stored in a binary buffer.
     * Its external representation is its data.
     * @private
     * @throws {@link SdDtfError} when content is not a {@link ISdDtfBufferValue}.
     */
    mapGenericData (content?: ISdDtfBufferValue): unknown {
        return content?.data
    }

}
