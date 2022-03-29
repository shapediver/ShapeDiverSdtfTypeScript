/** The reader is the central component for typing and validating data values. */
export interface ISdDtfReader {

    /** Returns `true` when the given type hint is supported by this reader. */
    isTypeHintSupported (typeHint: string): boolean

    /**
     * Parses and validates the given value for the given type hint.
     * @throws {@link SdDtfError} when the value is not of the specified type hint.
     */
    parseValue (typeHint: string, value: unknown): unknown

}
