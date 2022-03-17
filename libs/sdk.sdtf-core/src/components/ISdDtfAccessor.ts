import { ISdDtfBufferView } from "./ISdDtfBufferView"

/**
 * Accessors reference individual objects inside buffer views.
 * What they are referencing depends on the type of buffer view.
 * In some cases they reference a complete buffer view.
 *
 * As an example, an accessor referencing an object in a Rhino 3dm file would do so by the object's id in the 3dm file.
 */
export interface ISdDtfAccessor {

    /** The referenced buffer view. */
    bufferView: ISdDtfBufferView

    /**
     * ID of the referenced object inside the buffer view.
     * The meaning of this id is specific to the content type of the buffer view (the file type).
     * May be omitted in case the complete buffer view shall be referenced, e.g. in case of image files.
     *
     * We use this in case of an object in a Rhino 3dm file or another structured file format.
     */
    id?: string

    /** Additional properties are allowed. */
    [custom: string]: unknown

}
