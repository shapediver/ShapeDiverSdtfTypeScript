import { ISdtfBaseComponent } from "./ISdtfBaseComponent"

/** Representation of a [sdTF accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessor). */
export interface ISdtfAccessor extends ISdtfBaseComponent {

    /** Holds the positional index of the referenced buffer view object in the sdTF asset structure. */
    bufferView: number

    /**
     * ID of the referenced object inside the buffer view.
     * The meaning of this id is specific to the content type of the buffer view (the file type).
     * May be omitted in case the complete buffer view shall be referenced, e.g. in case of image files.
     *
     * We use this in case of an object in a Rhino 3dm file or another structured file format.
     */
    id?: string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
