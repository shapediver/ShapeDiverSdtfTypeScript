import { ISdDtfNode } from "../../structure/components/ISdDtfNode"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"
import { ISdDtfWriteableAttributes } from "./ISdDtfWriteableAttributes"
import { ISdDtfWriteableDataItem } from "./ISdDtfWriteableDataItem"
import { ISdDtfWriteableTypeHint } from "./ISdDtfWriteableTypeHint"

/** Representation of a [sdTF node](https://github.com/shapediver/sdTF/tree/development/specification/1.0#nodes). */
export interface ISdDtfWriteableNode extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfNode>, "attributes" | "items" | "nodes" | "typeHint"> {

    /** Attributes of the node. */
    attributes?: ISdDtfWriteableAttributes

    /** Data items of this node, may be empty. */
    items: ISdDtfWriteableDataItem[]

    /** Children of this node, may be empty. */
    nodes: ISdDtfWriteableNode[]

    /**
     * The type hint of the referenced accessor or value.
     * __Should__ be specified in case the type hint for all child nodes and items is the same.
     * __Must__ not be specified otherwise.
     */
    typeHint?: ISdDtfWriteableTypeHint

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
