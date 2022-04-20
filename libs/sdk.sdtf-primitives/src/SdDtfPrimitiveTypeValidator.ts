import {
    ISdDtfReadableAccessor,
    isInt,
    isNumber,
    isNumberArray,
    isNumeric,
    isUint,
    sdAssertUnreachable,
    SdDtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { Decimal } from "decimal.js"
import { SdDtfPrimitiveColorType } from "./ISdDtfPrimitiveTypes"

const UUIDv4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const SINGLE_MAX = new Decimal(3.40282347E+38)
const SINGLE_MIN = new Decimal(-3.40282347E+38)

/** Validates values that are of a type hint supported by this integration. */
export class SdDtfPrimitiveTypeValidator {

    /**
     * Validates the given component of the given type.
     * @throws {@link SdDtfError} when the given type is not supported.
     */
    validateComponent (typeHint: SdDtfPrimitiveTypeHintName, value?: unknown, accessor?: ISdDtfReadableAccessor): boolean {
        switch (typeHint) {
            case SdDtfPrimitiveTypeHintName.BOOLEAN:
                return SdDtfPrimitiveTypeValidator.validateBooleanType(value)
            case SdDtfPrimitiveTypeHintName.CHAR:
                return SdDtfPrimitiveTypeValidator.validateCharType(value)
            case SdDtfPrimitiveTypeHintName.COLOR:
                return SdDtfPrimitiveTypeValidator.validateColorType(value)
            case SdDtfPrimitiveTypeHintName.DATA:
                return !!accessor && value === undefined
            case SdDtfPrimitiveTypeHintName.DECIMAL:
                return SdDtfPrimitiveTypeValidator.validateDecimalType(value)
            case SdDtfPrimitiveTypeHintName.DOUBLE:
                return SdDtfPrimitiveTypeValidator.validateDoubleType(value)
            case SdDtfPrimitiveTypeHintName.GUID:
                return SdDtfPrimitiveTypeValidator.validateGuidType(value)
            case SdDtfPrimitiveTypeHintName.IMAGE:
                return !!accessor && value === undefined
            case SdDtfPrimitiveTypeHintName.INT8:
                return SdDtfPrimitiveTypeValidator.validateInt8Type(value)
            case SdDtfPrimitiveTypeHintName.INT16:
                return SdDtfPrimitiveTypeValidator.validateInt16Type(value)
            case SdDtfPrimitiveTypeHintName.INT32:
                return SdDtfPrimitiveTypeValidator.validateInt32Type(value)
            case SdDtfPrimitiveTypeHintName.INT64:
                return SdDtfPrimitiveTypeValidator.validateInt64Type(value)
            case SdDtfPrimitiveTypeHintName.SINGLE:
                return SdDtfPrimitiveTypeValidator.validateSingleType(value)
            case SdDtfPrimitiveTypeHintName.STRING:
                return SdDtfPrimitiveTypeValidator.validateStringType(value)
            case SdDtfPrimitiveTypeHintName.UINT8:
                return SdDtfPrimitiveTypeValidator.validateUint8Type(value)
            case SdDtfPrimitiveTypeHintName.UINT16:
                return SdDtfPrimitiveTypeValidator.validateUint16Type(value)
            case SdDtfPrimitiveTypeHintName.UINT32:
                return SdDtfPrimitiveTypeValidator.validateUint32Type(value)
            case SdDtfPrimitiveTypeHintName.UINT64:
                return SdDtfPrimitiveTypeValidator.validateUint64Type(value)
            default:
                sdAssertUnreachable(typeHint)
        }
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.BOOLEAN` type, otherwise `false`. */
    static validateBooleanType (value: unknown): value is boolean {
        return typeof value === "boolean"
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.CHAR` type, otherwise `false`. */
    static validateCharType (value: unknown): value is string {
        return typeof value === "string" && value.length === 1
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.COLOR` type. */
    static validateColorType (value: unknown): value is SdDtfPrimitiveColorType | string {
        // Validate color array
        if (isNumberArray(value) && value.length >= 3 && value.length <= 4) return true

        // Legacy colors are represented by a string
        if (typeof value !== "string") return false
        const parts = value.split(",")
        return (parts.length === 3 || parts.length === 4) && parts.every(p => isNumeric(p))
    }

    /**
     * Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.DECIMAL` type, otherwise `false`.
     *
     * WARNING:
     * JavaScript floating-point numbers have a maximum precision of 17, while .Net decimals have a precision of 29.
     * Thus, JavaScript automatically rounds them to a precision of 17.
     */
    static validateDecimalType (value: unknown): value is number {
        return isNumber(value) && new Decimal(value).precision() <= 17
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.DOUBLE` type, otherwise `false`. */
    static validateDoubleType (value: unknown): value is number {
        // Double-precision floating points have a precision between 15 and 17, and a range from +/- 1.7976931348623157E+308.
        // However, we do not have to check any limits here because JavaScript can't represent them anyway:
        //  * Precision > 17 is automatically rounded.
        //  * Exponent > 308 is represented as `Number.Infinity`.
        return isNumber(value)
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.GUID` type, otherwise `false`. */
    static validateGuidType (value: unknown): value is string {
        return typeof value === "string" && UUIDv4_REGEX.test(value)
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.INT8` type, otherwise `false`. */
    static validateInt8Type (value: unknown): value is number {
        return isInt(value) && value >= -128 && value <= 127
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.INT16` type, otherwise `false`. */
    static validateInt16Type (value: unknown): value is number {
        return isInt(value) && value >= -32768 && value <= 32767
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.INT32` type, otherwise `false`. */
    static validateInt32Type (value: unknown): value is number {
        return isInt(value) && value >= -2147483648 && value <= 2147483647
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.INT64` type, otherwise `false`. */
    static validateInt64Type (value: unknown): value is number {
        return isInt(value) && value >= -9223372036854775808 && value <= 9223372036854775807
    }

    /**
     * Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.SINGLE` type, otherwise `false`.
     *
     * NOTE:
     * The validation does only a rough check if the precision does not exceed 9 digits.
     * However, this might still lead to a loss in precision due to the nature of single-precision floating points.
     */
    static validateSingleType (value: unknown): value is number {
        if (!isNumber(value)) return false

        const decimal = new Decimal(value)
        return decimal.precision() <= 9 &&
            decimal.comparedTo(SINGLE_MIN) >= 0 &&
            decimal.comparedTo(SINGLE_MAX) <= 0
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.STRING` type, otherwise `false`. */
    static validateStringType (value: unknown): value is string {
        return typeof value === "string"
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.UINT8` type, otherwise `false`. */
    static validateUint8Type (value: unknown): value is number {
        return isUint(value) && value <= 255
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.UINT16` type, otherwise `false`. */
    static validateUint16Type (value: unknown): value is number {
        return isUint(value) && value <= 65535
    }

    /** Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.UINT32` type, otherwise `false`. */
    static validateUint32Type (value: unknown): value is number {
        return isUint(value) && value <= 4294967295
    }

    /**
     * Returns `true` when the given value is a valid `SdDtfPrimitiveTypeHintName.UINT64` type, otherwise `false`.
     *
     * WARNING:
     * Max safe integer in JavaScript is `9007199254740991`, while uint64 limit is `18446744073709551615`.
     * Thus, numbers bigger than safe integer are automatically mapped to `Number.Infinity`.
     */
    static validateUint64Type (value: unknown): value is number {
        return isUint(value)
    }

}
