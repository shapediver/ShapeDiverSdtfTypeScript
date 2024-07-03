import {
    ISdtfReadableAccessor,
    ISdtfWriteableAccessor,
    isInt,
    isNumber,
    isNumberArray,
    isNumeric,
    isUint,
    sdAssertUnreachable,
    SdtfPrimitiveTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { Decimal } from 'decimal.js';
import { SdtfPrimitiveColorType } from './ISdtfPrimitiveTypes';
import { SdtfPrimitiveTypeGuard } from './SdtfPrimitiveTypeGuard';

const UUIDv4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const SINGLE_MAX = new Decimal(3.40282347e38);
const SINGLE_MIN = new Decimal(-3.40282347e38);

/** Validates values that are of a type hint supported by this integration. */
export class SdtfPrimitiveTypeValidator {
    /**
     * Validates the given component of the given type.
     * @throws {@link SdtfError} when the given type is not supported.
     */
    validateComponent(
        typeHint: SdtfPrimitiveTypeHintName,
        value?: unknown,
        accessor?: ISdtfReadableAccessor | ISdtfWriteableAccessor
    ): boolean {
        switch (typeHint) {
            case SdtfPrimitiveTypeHintName.BOOLEAN:
                return SdtfPrimitiveTypeGuard.isBoolean(value);
            case SdtfPrimitiveTypeHintName.CHAR:
                return SdtfPrimitiveTypeValidator.validateCharType(value);
            case SdtfPrimitiveTypeHintName.COLOR:
                return SdtfPrimitiveTypeValidator.validateColorType(value);
            case SdtfPrimitiveTypeHintName.DATA:
                return !!accessor && value === undefined;
            case SdtfPrimitiveTypeHintName.DECIMAL:
                return SdtfPrimitiveTypeGuard.isNumber(value);
            case SdtfPrimitiveTypeHintName.DOUBLE:
                return SdtfPrimitiveTypeGuard.isNumber(value);
            case SdtfPrimitiveTypeHintName.GUID:
                return SdtfPrimitiveTypeValidator.validateGuidType(value);
            case SdtfPrimitiveTypeHintName.IMAGE:
                return !!accessor && value === undefined;
            case SdtfPrimitiveTypeHintName.INT8:
                return SdtfPrimitiveTypeValidator.validateInt8Type(value);
            case SdtfPrimitiveTypeHintName.INT16:
                return SdtfPrimitiveTypeValidator.validateInt16Type(value);
            case SdtfPrimitiveTypeHintName.INT32:
                return SdtfPrimitiveTypeValidator.validateInt32Type(value);
            case SdtfPrimitiveTypeHintName.INT64:
                return SdtfPrimitiveTypeValidator.validateInt64Type(value);
            case SdtfPrimitiveTypeHintName.JSON:
                return SdtfPrimitiveTypeGuard.isJson(value);
            case SdtfPrimitiveTypeHintName.SINGLE:
                return SdtfPrimitiveTypeValidator.validateSingleType(value);
            case SdtfPrimitiveTypeHintName.STRING:
                return SdtfPrimitiveTypeGuard.isString(value);
            case SdtfPrimitiveTypeHintName.UINT8:
                return SdtfPrimitiveTypeValidator.validateUint8Type(value);
            case SdtfPrimitiveTypeHintName.UINT16:
                return SdtfPrimitiveTypeValidator.validateUint16Type(value);
            case SdtfPrimitiveTypeHintName.UINT32:
                return SdtfPrimitiveTypeValidator.validateUint32Type(value);
            case SdtfPrimitiveTypeHintName.UINT64:
                return SdtfPrimitiveTypeValidator.validateUint64Type(value);
            default:
                sdAssertUnreachable(typeHint);
        }
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.CHAR` type, otherwise `false`. */
    static validateCharType(value: unknown): value is string {
        return SdtfPrimitiveTypeGuard.isString(value) && value.length === 1;
    }

    /**
     * Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.COLOR` type.
     *
     * NOTE:
     * The validator excepts both color types, regular (4 parts) and legacy (3 parts). However, a
     * legacy color is later on mapped to a regular color structure.
     */
    static validateColorType(value: unknown): value is SdtfPrimitiveColorType | string {
        // Validate color array
        if (isNumberArray(value) && value.length >= 3 && value.length <= 4) return true;

        // Legacy colors are represented by a string
        if (typeof value !== 'string') return false;
        const parts = value.split(',');
        return (parts.length === 3 || parts.length === 4) && parts.every((p) => isNumeric(p));
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.GUID` type, otherwise `false`. */
    static validateGuidType(value: unknown): value is string {
        return SdtfPrimitiveTypeGuard.isString(value) && UUIDv4_REGEX.test(value);
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.INT8` type, otherwise `false`. */
    static validateInt8Type(value: unknown): value is number {
        return isInt(value) && value >= -128 && value <= 127;
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.INT16` type, otherwise `false`. */
    static validateInt16Type(value: unknown): value is number {
        return isInt(value) && value >= -32768 && value <= 32767;
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.INT32` type, otherwise `false`. */
    static validateInt32Type(value: unknown): value is number {
        return isInt(value) && value >= -2147483648 && value <= 2147483647;
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.INT64` type, otherwise `false`. */
    static validateInt64Type(value: unknown): value is number {
        return isInt(value) && value >= -9223372036854775808 && value <= 9223372036854775807;
    }

    /**
     * Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.SINGLE` type, otherwise `false`.
     *
     * NOTE:
     * The validation does only a rough check if the precision does not exceed 9 digits.
     * However, this might still lead to a loss in precision due to the nature of single-precision floating points.
     */
    static validateSingleType(value: unknown): value is number {
        if (!isNumber(value)) return false;

        const decimal = new Decimal(value);
        return (
            decimal.precision() <= 9 &&
            decimal.comparedTo(SINGLE_MIN) >= 0 &&
            decimal.comparedTo(SINGLE_MAX) <= 0
        );
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.UINT8` type, otherwise `false`. */
    static validateUint8Type(value: unknown): value is number {
        return isUint(value) && value <= 255;
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.UINT16` type, otherwise `false`. */
    static validateUint16Type(value: unknown): value is number {
        return isUint(value) && value <= 65535;
    }

    /** Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.UINT32` type, otherwise `false`. */
    static validateUint32Type(value: unknown): value is number {
        return isUint(value) && value <= 4294967295;
    }

    /**
     * Returns `true` when the given value is a valid `SdtfPrimitiveTypeHintName.UINT64` type, otherwise `false`.
     *
     * WARNING:
     * Max safe integer in JavaScript is `9007199254740991`, while uint64 limit is `18446744073709551615`.
     * Thus, numbers bigger than safe integer are automatically mapped to `Number.Infinity`.
     */
    static validateUint64Type(value: unknown): value is number {
        return isUint(value);
    }
}
