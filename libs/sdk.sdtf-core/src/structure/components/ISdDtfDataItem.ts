import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"

/** Representation of a [sdTF data item](https://github.com/shapediver/sdTF/tree/development/specification/1.0#item). */
export interface ISdDtfDataItem extends ISdDtfBaseComponent {

    /** Holds the positional index of the referenced accessor object in the sdTF asset structure. */
    accessor?: number

    /** Holds the positional index of the referenced attributes object in the sdTF asset structure. */
    attributes?: number

    /** Holds the positional index of the referenced type hint object in the sdTF asset structure. */
    typeHint?: number

    /** Embedded representation of the data item, used for primitive values. */
    value?: unknown

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
