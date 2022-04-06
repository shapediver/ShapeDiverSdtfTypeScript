import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"

/** Representation of a [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffer). */
export interface ISdDtfBuffer extends ISdDtfBaseComponent {

    /** The length of the buffer in bytes. */
    byteLength: number

    /**
     * The URI of the buffer.
     * Relative paths are relative to the `.sddtf`-file.
     * Instead of referencing an external file, the URI can also be a data-uri.
     * Not set in case of the directly attached buffer used for _binary sdTF_.
     */
    uri?: string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
