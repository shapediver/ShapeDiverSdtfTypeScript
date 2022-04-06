import { ISdDtfNode } from "../../structure/components/ISdDtfNode"
import { ISdDtfReadableAttributes } from "./ISdDtfReadableAttributes"
import { ISdDtfReadableBaseComponent, SdDtfReadableBase } from "./ISdDtfReadableBaseComponent"
import { ISdDtfReadableDataItem } from "./ISdDtfReadableDataItem"
import { ISdDtfReadableTypeHint } from "./ISdDtfReadableTypeHint"

/** Representation of a [sdTF node](https://github.com/shapediver/sdTF/tree/development/specification/1.0#nodes). */
export interface ISdDtfReadableNode extends ISdDtfReadableBaseComponent,
    Omit<SdDtfReadableBase<ISdDtfNode>, "attributes" | "items" | "nodes" | "typeHint"> {

    /** Attributes of the node. */
    attributes?: ISdDtfReadableAttributes

    /** Data items of this node, may be empty. */
    items: ISdDtfReadableDataItem[]

    /** Children of this node, may be empty. */
    nodes: ISdDtfReadableNode[]

    /**
     * The type hint of the referenced accessor or value.
     * __Should__ be specified in case the type hint for all child nodes and items is the same.
     * __Must__ not be specified otherwise.
     */
    typeHint?: ISdDtfReadableTypeHint

}
