import { ISdDtfTypeReader } from "./ISdDtfTypeReader"

/** The integration binds reading, writing and validation logic to the supported type hints of the integration. */
export interface ISdDtfIntegration {

    /** Returns `true` when the given type hint is supported by this integration; otherwise `false`. */
    isTypeHintSupported (typeHintName: string): boolean

    /** Returns a reader instance for parsing and mapping data content. */
    getReader (): ISdDtfTypeReader

}
