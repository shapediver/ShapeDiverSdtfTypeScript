import { isNumber, isNumberArray, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveColorType } from "./ISdDtfPrimitiveTypes"

export class SdDtfPrimitiveTypeGuard {

    /**
     * Runtime check that raises an error when the given value is not of type `SdDtfPrimitiveTypeHintName.BOOLEAN`.
     * @throws {@link SdDtfError} when the invariant is not met.
     */
    static assertBoolean (value: unknown): asserts value is boolean {
        if (!this.isBoolean(value)) throw new SdDtfError("Assertion error: Value is not a primitive boolean type.")
    }

    /** Returns `true` when the given value is of type `SdDtfPrimitiveTypeHintName.BOOLEAN`. */
    static isBoolean (value: unknown): value is boolean {
        return typeof value === "boolean"
    }

    /**
     * Runtime check that raises an error when the given value is not of type:
     *   * `SdDtfPrimitiveTypeHintName.CHAR`
     *   * `SdDtfPrimitiveTypeHintName.GUID`
     *   * `SdDtfPrimitiveTypeHintName.STRING`
     * @throws {@link SdDtfError} when the invariant is not met.
     */
    static assertString (value: unknown): asserts value is string {
        if (!this.isString(value)) throw new SdDtfError("Assertion error: Value is not a primitive string type.")
    }

    /**
     * Returns `true` when the given value is of type:
     *   * `SdDtfPrimitiveTypeHintName.CHAR`
     *   * `SdDtfPrimitiveTypeHintName.GUID`
     *   * `SdDtfPrimitiveTypeHintName.STRING`
     */
    static isString (value: unknown): value is string {
        return typeof value === "string"
    }

    /**
     * Runtime check that raises an error when the given value is not of type:
     *   * `SdDtfPrimitiveTypeHintName.DECIMAL`
     *   * `SdDtfPrimitiveTypeHintName.DOUBLE`
     *   * `SdDtfPrimitiveTypeHintName.SINGLE`
     *   * `SdDtfPrimitiveTypeHintName.INT8`
     *   * `SdDtfPrimitiveTypeHintName.INT16`
     *   * `SdDtfPrimitiveTypeHintName.INT32`
     *   * `SdDtfPrimitiveTypeHintName.INT64`
     *   * `SdDtfPrimitiveTypeHintName.UINT8`
     *   * `SdDtfPrimitiveTypeHintName.UINT16`
     *   * `SdDtfPrimitiveTypeHintName.UINT32`
     *   * `SdDtfPrimitiveTypeHintName.UINT64`
     * @throws {@link SdDtfError} when the invariant is not met.
     */
    static assertNumber (value: unknown): asserts value is number {
        if (!this.isNumber(value)) throw new SdDtfError("Assertion error: Value is not a primitive number type.")
    }

    /**
     * Returns `true` when the given value is of type:
     *   * `SdDtfPrimitiveTypeHintName.DECIMAL`
     *   * `SdDtfPrimitiveTypeHintName.DOUBLE`
     *   * `SdDtfPrimitiveTypeHintName.SINGLE`
     *   * `SdDtfPrimitiveTypeHintName.INT8`
     *   * `SdDtfPrimitiveTypeHintName.INT16`
     *   * `SdDtfPrimitiveTypeHintName.INT32`
     *   * `SdDtfPrimitiveTypeHintName.INT64`
     *   * `SdDtfPrimitiveTypeHintName.UINT8`
     *   * `SdDtfPrimitiveTypeHintName.UINT16`
     *   * `SdDtfPrimitiveTypeHintName.UINT32`
     *   * `SdDtfPrimitiveTypeHintName.UINT64`
     */
    static isNumber (value: unknown): value is number {
        return isNumber(value)
    }

    /**
     * Runtime check that raises an error when the given value is not of type `SdDtfPrimitiveTypeHintName.COLOR`.
     * @throws {@link SdDtfError} when the invariant is not met.
     */
    static assertColor (value: unknown): asserts value is SdDtfPrimitiveColorType {
        if (!this.isColor(value)) throw new SdDtfError("Assertion error: Value is not a primitive color type.")
    }

    /** Returns `true` when the given value is of type `SdDtfPrimitiveTypeHintName.COLOR`. */
    static isColor (value: unknown): value is SdDtfPrimitiveColorType {
        return isNumberArray(value) && value.length === 4
    }

    /**
     * Runtime check that raises an error when the given value is not of type:
     *   * `SdDtfPrimitiveTypeHintName.DATA`
     *   * `SdDtfPrimitiveTypeHintName.IMAGE`
     * @throws {@link SdDtfError} when the invariant is not met.
     */
    static assertDataView (value: unknown): asserts value is DataView {
        if (!this.isDataView(value)) throw new SdDtfError("Assertion error: Value is not a primitive data type.")
    }

    /**
     * Returns `true` when the given value is of type:
     *   * `SdDtfPrimitiveTypeHintName.DATA`
     *   * `SdDtfPrimitiveTypeHintName.IMAGE`
     */
    static isDataView (value: unknown): value is DataView {
        return ArrayBuffer.isView(value)
    }

}
