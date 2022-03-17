import { ISdDtfAccessor } from "./ISdDtfAccessor"
import { ISdDtfAttributes } from "./ISdDtfAttributes"
import { ISdDtfTypeHint } from "./ISdDtfTypeHint"

/**
 * Data items serve as the leaves of trees defined by nodes.
 * The actual data may be embedded directly, or a reference to an accessor.
 * Data items can have optional attributes.
 */
export interface ISdDtfDataItem {

    /** Referenced accessor to binary data. */
    accessor?: ISdDtfAccessor

    /** Referenced attributes of the data item. */
    attributes?: ISdDtfAttributes

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdDtfTypeHint

    /** Embedded representation of the data item, used for primitive values. */
    value?: unknown

    /** Additional properties are allowed. */
    [custom: string]: unknown

}
