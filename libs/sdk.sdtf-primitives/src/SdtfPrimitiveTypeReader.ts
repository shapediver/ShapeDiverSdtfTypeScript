import {
    ISdtfBufferValue,
    ISdtfReadableContentComponent,
    ISdtfTypeReader,
    sdAssertUnreachable,
    SdtfError,
    SdtfPrimitiveTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfPrimitiveTypeValidator } from './SdtfPrimitiveTypeValidator';

export class SdtfPrimitiveTypeReader implements ISdtfTypeReader {
    private readonly validator = new SdtfPrimitiveTypeValidator();

    async readComponent(component: ISdtfReadableContentComponent): Promise<unknown> {
        const typeHint = component.typeHint?.name as SdtfPrimitiveTypeHintName;

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdtfError(`Cannot read value of type '${typeHint}': Invalid component.`);
        }

        // Map the component data and return the result
        switch (typeHint) {
            case SdtfPrimitiveTypeHintName.BOOLEAN:
            case SdtfPrimitiveTypeHintName.CHAR:
            case SdtfPrimitiveTypeHintName.DECIMAL:
            case SdtfPrimitiveTypeHintName.DOUBLE:
            case SdtfPrimitiveTypeHintName.GUID:
            case SdtfPrimitiveTypeHintName.INT8:
            case SdtfPrimitiveTypeHintName.INT16:
            case SdtfPrimitiveTypeHintName.INT32:
            case SdtfPrimitiveTypeHintName.INT64:
            case SdtfPrimitiveTypeHintName.JSON:
            case SdtfPrimitiveTypeHintName.SINGLE:
            case SdtfPrimitiveTypeHintName.STRING:
            case SdtfPrimitiveTypeHintName.UINT8:
            case SdtfPrimitiveTypeHintName.UINT16:
            case SdtfPrimitiveTypeHintName.UINT32:
            case SdtfPrimitiveTypeHintName.UINT64:
                return component.value; // Nothing to map here
            case SdtfPrimitiveTypeHintName.COLOR:
                return this.mapColor(component.value);
            case SdtfPrimitiveTypeHintName.DATA:
            case SdtfPrimitiveTypeHintName.IMAGE:
                return this.mapGenericData(await component.accessor?.getContent());
            default:
                sdAssertUnreachable(typeHint);
        }
    }

    /**
     * The internal representation of Color is either an array or a string (legacy).
     * Its external representation is a number-array.
     * @private
     */
    mapColor(content: unknown): unknown {
        let parts: number[];

        if (Array.isArray(content)) {
            // Handle regular color
            parts = content;
        } else {
            // Handle legacy color: Map sdTF color string to array and divide by 255
            // Example: "255,255,255" -> [ 1, 1, 1 ]
            parts = (content as string).split(',').map((p) => Number(p) / 255);
        }

        let res = [...parts];

        // Default alpha content is `1`
        if (res.length === 3) res = [...parts, 1];

        return res;
    }

    /**
     * Data content is stored in a binary buffer.
     * Its external representation is its data.
     * @private
     * @throws {@link SdtfError} when content is not a {@link ISdtfBufferValue}.
     */
    mapGenericData(content?: ISdtfBufferValue): unknown {
        return content?.data;
    }
}
