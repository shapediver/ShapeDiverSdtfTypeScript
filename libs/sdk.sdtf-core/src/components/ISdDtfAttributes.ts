import { ISdDtfAccessor } from "./ISdDtfAccessor"
import { ISdDtfTypeHint } from "./ISdDtfTypeHint"

/** Attributes are stored as dictionaries, mapping an arbitrary number of attribute names to their values. */
export interface ISdDtfAttributes {

    [name: string]: ISdDtfAttribute

}

/** The value of a single attributes dictionary key */
export interface ISdDtfAttribute {

    /** Referenced accessor to binary data. */
    accessor?: ISdDtfAccessor

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdDtfTypeHint

    /** Embedded representation of the data item, used for primitive values. */
    value?: unknown

    /**
     * Returns the data value.
     *
     * When the data is linked via {@link accessor}, than the respective buffer is loaded and the corresponding value is
     * extracted and returned.
     *
     * When both, {@link value} and {@link accessor}, are defined than {@link value} precedes.
     */
    getContent (): Promise<unknown>

}
