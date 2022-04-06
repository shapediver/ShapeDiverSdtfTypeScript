import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"

/** Representation of a [sdTF type hint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#typehint). */
export interface ISdDtfTypeHint extends ISdDtfBaseComponent {

    /** Name of the type hint. */
    name: string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
