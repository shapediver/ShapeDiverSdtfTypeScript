import { ISdDtfReadableAccessor } from "./components/ISdDtfReadableAccessor"
import { ISdDtfReadableTypeHint } from "./components/ISdDtfReadableTypeHint"

export interface ISdDtfReadableContentComponent {

    /** Referenced accessor to binary data. */
    accessor?: ISdDtfReadableAccessor

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdDtfReadableTypeHint

    /** Embedded representation of the data item. */
    value?: unknown

}
