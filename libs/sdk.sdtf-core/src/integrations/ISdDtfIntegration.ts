import { ISdDtfWriteableComponentFactory } from "../writer/ISdDtfWriteableComponentFactory"
import { ISdDtfTypeReader } from "./ISdDtfTypeReader"
import { ISdDtfTypeWriter } from "./ISdDtfTypeWriter"

/** The integration binds reading, writing and validation logic to the supported type hints of the integration. */
export interface ISdDtfIntegration {

    /** Returns `true` when the given type hint is supported by this integration; otherwise `false`. */
    isTypeHintSupported (typeHintName: string): boolean

    /** This function is called when the sdTF SDK is instantiated. */
    init (): Promise<void>

    /** Returns a reader instance for parsing and mapping data content. */
    getReader (): ISdDtfTypeReader

    /** Returns a writer instance for mapping data content. */
    getWriter (factory: ISdDtfWriteableComponentFactory): ISdDtfTypeWriter

}
