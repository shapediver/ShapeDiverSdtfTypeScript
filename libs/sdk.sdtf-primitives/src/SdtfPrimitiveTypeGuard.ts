import { isDataObject, isNumber, isNumberArray, SdtfError, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfPrimitiveColorType, SdtfPrimitiveJsonType } from "./ISdtfPrimitiveTypes"

export class SdtfPrimitiveTypeGuard {

    /**
     * Runtime check that raises an error when the given value is not of type `SdtfPrimitiveTypeHintName.BOOLEAN`.
     * @throws {@link SdtfError} when the invariant is not met.
     */
    static assertBoolean (value: unknown): asserts value is boolean {
        if (!this.isBoolean(value)) throw new SdtfError("Assertion error: Value is not a primitive boolean type.")
    }

    /** Returns `true` when the given value is of type `SdtfPrimitiveTypeHintName.BOOLEAN`. */
    static isBoolean (value: unknown): value is boolean {
        return typeof value === "boolean"
    }

    /** Returns `true` when the given type hint name is of type `SdtfPrimitiveTypeHintName.BOOLEAN`. */
    static isBooleanType (typeHint: string | undefined): typeHint is SdtfPrimitiveTypeHintName.BOOLEAN {
        return typeHint === SdtfPrimitiveTypeHintName.BOOLEAN
    }

    /**
     * Runtime check that raises an error when the given value is not of type:
     *   * `SdtfPrimitiveTypeHintName.CHAR`
     *   * `SdtfPrimitiveTypeHintName.GUID`
     *   * `SdtfPrimitiveTypeHintName.STRING`
     * @throws {@link SdtfError} when the invariant is not met.
     */
    static assertString (value: unknown): asserts value is string {
        if (!this.isString(value)) throw new SdtfError("Assertion error: Value is not a primitive string type.")
    }

    /**
     * Returns `true` when the given value is of type:
     *   * `SdtfPrimitiveTypeHintName.CHAR`
     *   * `SdtfPrimitiveTypeHintName.GUID`
     *   * `SdtfPrimitiveTypeHintName.STRING`
     */
    static isString (value: unknown): value is string {
        return typeof value === "string"
    }

    /**
     * Returns `true` when the given type hint name is of type:
     *   * `SdtfPrimitiveTypeHintName.CHAR`
     *   * `SdtfPrimitiveTypeHintName.GUID`
     *   * `SdtfPrimitiveTypeHintName.STRING`
     */
    static isStringType (typeHint: string | undefined): typeHint is SdtfPrimitiveTypeHintName.CHAR | SdtfPrimitiveTypeHintName.GUID | SdtfPrimitiveTypeHintName.STRING {
        return [
            SdtfPrimitiveTypeHintName.CHAR,
            SdtfPrimitiveTypeHintName.GUID,
            SdtfPrimitiveTypeHintName.STRING,
        ].includes(typeHint as SdtfPrimitiveTypeHintName)
    }

    /**
     * Runtime check that raises an error when the given value is not of type:
     *   * `SdtfPrimitiveTypeHintName.DECIMAL`
     *   * `SdtfPrimitiveTypeHintName.DOUBLE`
     *   * `SdtfPrimitiveTypeHintName.SINGLE`
     *   * `SdtfPrimitiveTypeHintName.INT8`
     *   * `SdtfPrimitiveTypeHintName.INT16`
     *   * `SdtfPrimitiveTypeHintName.INT32`
     *   * `SdtfPrimitiveTypeHintName.INT64`
     *   * `SdtfPrimitiveTypeHintName.UINT8`
     *   * `SdtfPrimitiveTypeHintName.UINT16`
     *   * `SdtfPrimitiveTypeHintName.UINT32`
     *   * `SdtfPrimitiveTypeHintName.UINT64`
     * @throws {@link SdtfError} when the invariant is not met.
     */
    static assertNumber (value: unknown): asserts value is number {
        if (!this.isNumber(value)) throw new SdtfError("Assertion error: Value is not a primitive number type.")
    }

    /**
     * Returns `true` when the given value is of type:
     *   * `SdtfPrimitiveTypeHintName.DECIMAL`
     *   * `SdtfPrimitiveTypeHintName.DOUBLE`
     *   * `SdtfPrimitiveTypeHintName.SINGLE`
     *   * `SdtfPrimitiveTypeHintName.INT8`
     *   * `SdtfPrimitiveTypeHintName.INT16`
     *   * `SdtfPrimitiveTypeHintName.INT32`
     *   * `SdtfPrimitiveTypeHintName.INT64`
     *   * `SdtfPrimitiveTypeHintName.UINT8`
     *   * `SdtfPrimitiveTypeHintName.UINT16`
     *   * `SdtfPrimitiveTypeHintName.UINT32`
     *   * `SdtfPrimitiveTypeHintName.UINT64`
     */
    static isNumber (value: unknown): value is number {
        return isNumber(value)
    }

    /**
     * Returns `true` when the given type hint name is of type:
     *   * `SdtfPrimitiveTypeHintName.DECIMAL`
     *   * `SdtfPrimitiveTypeHintName.DOUBLE`
     *   * `SdtfPrimitiveTypeHintName.SINGLE`
     *   * `SdtfPrimitiveTypeHintName.INT8`
     *   * `SdtfPrimitiveTypeHintName.INT16`
     *   * `SdtfPrimitiveTypeHintName.INT32`
     *   * `SdtfPrimitiveTypeHintName.INT64`
     *   * `SdtfPrimitiveTypeHintName.UINT8`
     *   * `SdtfPrimitiveTypeHintName.UINT16`
     *   * `SdtfPrimitiveTypeHintName.UINT32`
     *   * `SdtfPrimitiveTypeHintName.UINT64`
     */
    static isNumberType (typeHint: string | undefined): typeHint is SdtfPrimitiveTypeHintName.DECIMAL | SdtfPrimitiveTypeHintName.DOUBLE | SdtfPrimitiveTypeHintName.SINGLE | SdtfPrimitiveTypeHintName.INT8 | SdtfPrimitiveTypeHintName.INT16 | SdtfPrimitiveTypeHintName.INT32 | SdtfPrimitiveTypeHintName.INT64 | SdtfPrimitiveTypeHintName.UINT8 | SdtfPrimitiveTypeHintName.UINT16 | SdtfPrimitiveTypeHintName.UINT32 | SdtfPrimitiveTypeHintName.UINT64 {
        return [
            SdtfPrimitiveTypeHintName.DECIMAL,
            SdtfPrimitiveTypeHintName.DOUBLE,
            SdtfPrimitiveTypeHintName.SINGLE,
            SdtfPrimitiveTypeHintName.INT8,
            SdtfPrimitiveTypeHintName.INT16,
            SdtfPrimitiveTypeHintName.INT32,
            SdtfPrimitiveTypeHintName.INT64,
            SdtfPrimitiveTypeHintName.UINT8,
            SdtfPrimitiveTypeHintName.UINT16,
            SdtfPrimitiveTypeHintName.UINT32,
            SdtfPrimitiveTypeHintName.UINT64,
        ].includes(typeHint as SdtfPrimitiveTypeHintName)
    }

    /**
     * Runtime check that raises an error when the given value is not of type `SdtfPrimitiveTypeHintName.COLOR`.
     * @throws {@link SdtfError} when the invariant is not met.
     */
    static assertColor (value: unknown): asserts value is SdtfPrimitiveColorType {
        if (!this.isColor(value)) throw new SdtfError("Assertion error: Value is not a primitive color type.")
    }

    /** Returns `true` when the given value is of type `SdtfPrimitiveTypeHintName.COLOR`. */
    static isColor (value: unknown): value is SdtfPrimitiveColorType {
        return isNumberArray(value) && value.length === 4
    }

    /** Returns `true` when the given type hint name is of type `SdtfPrimitiveTypeHintName.COLOR`. */
    static isColorType (typeHint: string | undefined): typeHint is SdtfPrimitiveTypeHintName.COLOR {
        return typeHint === SdtfPrimitiveTypeHintName.COLOR
    }

    /**
     * Runtime check that raises an error when the given value is not of type:
     *   * `SdtfPrimitiveTypeHintName.DATA`
     *   * `SdtfPrimitiveTypeHintName.IMAGE`
     * @throws {@link SdtfError} when the invariant is not met.
     */
    static assertDataView (value: unknown): asserts value is DataView {
        if (!this.isDataView(value)) throw new SdtfError("Assertion error: Value is not a primitive data type.")
    }

    /**
     * Returns `true` when the given value is of type:
     *   * `SdtfPrimitiveTypeHintName.DATA`
     *   * `SdtfPrimitiveTypeHintName.IMAGE`
     */
    static isDataView (value: unknown): value is DataView {
        return ArrayBuffer.isView(value)
    }

    /**
     * Returns `true` when the given type hint name is of type:
     *   * `SdtfPrimitiveTypeHintName.DATA`
     *   * `SdtfPrimitiveTypeHintName.IMAGE`
     */
    static isDataViewType (typeHint: string | undefined): typeHint is SdtfPrimitiveTypeHintName.DATA | SdtfPrimitiveTypeHintName.IMAGE {
        return [
            SdtfPrimitiveTypeHintName.DATA,
            SdtfPrimitiveTypeHintName.IMAGE,
        ].includes(typeHint as SdtfPrimitiveTypeHintName)
    }

    /**
     * Runtime check that raises an error when the given value is not of type `SdtfPrimitiveTypeHintName.JSON`.
     * @throws {@link SdtfError} when the invariant is not met.
     */
    static assertJson (value: unknown): asserts value is SdtfPrimitiveJsonType {
        if (!this.isJson(value)) throw new SdtfError("Assertion error: Value is not a primitive json type.")
    }

    /** Returns `true` when the given value is of type `SdtfPrimitiveTypeHintName.JSON`. */
    static isJson (value: unknown): value is SdtfPrimitiveJsonType {
        return isDataObject(value)|| Array.isArray(value)
    }

    /** Returns `true` when the given type hint name is of type `SdtfPrimitiveTypeHintName.JSON`. */
    static isJsonType (typeHint: string | undefined): typeHint is SdtfPrimitiveTypeHintName.JSON {
        return typeHint === SdtfPrimitiveTypeHintName.JSON
    }

}
