import { ISdtfNode } from "../../structure/components/ISdtfNode"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"
import { ISdtfWriteableAttributes } from "./ISdtfWriteableAttributes"
import { ISdtfWriteableDataItem } from "./ISdtfWriteableDataItem"
import { ISdtfWriteableTypeHint } from "./ISdtfWriteableTypeHint"

/** Representation of a [sdTF node](https://github.com/shapediver/sdTF/tree/development/specification/1.0#nodes). */
export interface ISdtfWriteableNode extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfNode>, "attributes" | "items" | "nodes" | "typeHint"> {

    /** Attributes of the node. */
    attributes?: ISdtfWriteableAttributes

    /** Data items of this node, may be empty. */
    items: ISdtfWriteableDataItem[]

    /** Children of this node, may be empty. */
    nodes: ISdtfWriteableNode[]

    /**
     * The type hint of the referenced accessor or value.
     * __Should__ be specified in case the type hint for all child nodes and items is the same.
     * __Must__ not be specified otherwise.
     */
    typeHint?: ISdtfWriteableTypeHint

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
