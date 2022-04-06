/**
 * Validates values that are of a type hint supported by the integration.
 * All values are stored directly in the sdTF JSON content and the validation step is executed when a sdTF is loaded or
 * newly created.
 */
export interface ISdDtfValueValidator {

    /**
     * Validates the given content data of the given type.
     * @throws {@link SdDtfError} when the given type is not supported.
     */
    validateValue (typeHint: string, value: unknown): boolean

}
