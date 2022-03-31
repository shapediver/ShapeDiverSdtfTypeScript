import {
    enumValues,
    ISdDtfReader,
    isNumeric,
    sdAssertUnreachable,
    SdDtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeGuard } from "./SdDtfPrimitiveTypeGuard"

export class SdDtfPrimitiveTypeReader implements ISdDtfReader {

    isTypeHintSupported (typeHint: string): typeHint is SdDtfPrimitiveTypeHintName {
        return enumValues(SdDtfPrimitiveTypeHintName).includes(typeHint)
    }

    parseValue (typeHint: SdDtfPrimitiveTypeHintName, value: unknown): unknown {
        switch (typeHint) {
            case SdDtfPrimitiveTypeHintName.BOOLEAN:
                return this.parseBooleanValue(value)
            case SdDtfPrimitiveTypeHintName.CHAR:
            case SdDtfPrimitiveTypeHintName.GUID:
            case SdDtfPrimitiveTypeHintName.STRING:
                return this.parseStringValue(value)
            case SdDtfPrimitiveTypeHintName.DECIMAL:
            case SdDtfPrimitiveTypeHintName.DOUBLE:
            case SdDtfPrimitiveTypeHintName.SINGLE:
            case SdDtfPrimitiveTypeHintName.INT8:
            case SdDtfPrimitiveTypeHintName.INT16:
            case SdDtfPrimitiveTypeHintName.INT32:
            case SdDtfPrimitiveTypeHintName.INT64:
            case SdDtfPrimitiveTypeHintName.UINT8:
            case SdDtfPrimitiveTypeHintName.UINT16:
            case SdDtfPrimitiveTypeHintName.UINT32:
            case SdDtfPrimitiveTypeHintName.UINT64:
                return this.parseNumberValue(value)
            case SdDtfPrimitiveTypeHintName.COLOR:
                return this.parseColorValue(value)
            case SdDtfPrimitiveTypeHintName.DATA:
            case SdDtfPrimitiveTypeHintName.IMAGE:
                return this.parseDataValue(value)
            default:
                sdAssertUnreachable(typeHint)
        }
    }

    /**
     * Parses and validates the given value.
     * @private
     * @throws {@link SdDtfError} when value is invalid for this type.
     */
    parseBooleanValue (value: unknown): boolean {
        // Map string to boolean
        if (value === "true") value = true
        if (value === "false") value = false

        SdDtfPrimitiveTypeGuard.assertBoolean(value)
        return value
    }

    /**
     * Parses and validates the given value.
     * @private
     * @throws {@link SdDtfError} when value is invalid for this type.
     */
    parseStringValue (value: unknown): string {
        SdDtfPrimitiveTypeGuard.assertString(value)
        return value
    }

    /**
     * Parses and validates the given value.
     * @private
     * @throws {@link SdDtfError} when value is invalid for this type.
     */
    parseNumberValue (value: unknown): number {
        // Map string number to number
        if (isNumeric(value)) value = Number(value)

        SdDtfPrimitiveTypeGuard.assertNumber(value)
        return value
    }

    /**
     * Parses and validates the given value.
     * @private
     * @throws {@link SdDtfError} when value is invalid for this type.
     */
    parseColorValue (value: unknown): [ number, number, number, number ] {
        // Map sdTF color string to array
        if (typeof value === "string") {
            const parts = value.split(",").map(p => Number(p))
            if (parts.length === 3) value = [ ...parts, 1 ]     // Default alpha value is `1`
            if (parts.length === 4) value = [ ...parts ]
        }

        SdDtfPrimitiveTypeGuard.assertColor(value)
        return value
    }

    /**
     * Parses and validates the given value.
     * @private
     * @throws {@link SdDtfError} when value is invalid for this type.
     */
    parseDataValue (value: unknown): DataView {
        // This comes form a buffer as a ISdDtfBufferData object
        if (value && typeof value === "object" && ("data" in value)) {
            value = (value as { [data: string]: unknown }).data
        }

        SdDtfPrimitiveTypeGuard.assertData(value)
        return value
    }

}
