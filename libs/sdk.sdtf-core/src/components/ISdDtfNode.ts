import { ISdDtfAttributes } from "./ISdDtfAttributes"
import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"
import { ISdDtfDataItem } from "./ISdDtfDataItem"
import { ISdDtfTypeHint } from "./ISdDtfTypeHint"

/**
 * Trees in sdTF are made of nodes.
 * Nodes can reference other nodes and/or data items.
 */
export interface ISdDtfNode extends ISdDtfBaseComponent {

    /** Holds the sequential index in the sdTF asset structure. */
    componentId: number

    /** Attributes of the node. */
    attributes?: ISdDtfAttributes

    /** Data items of this node, may be empty. */
    items: ISdDtfDataItem[]

    /**
     * Optional name of the node.
     * A name __must__ be set for top level nodes ({@link ISdDtfChunk}).
     * Nodes on the second level __may__ have a name, which typically corresponds to a string representation of the path
     * of a branch of a Grasshopper tree.
     */
    name?: string

    /** Children of this node, may be empty. */
    nodes: ISdDtfNode[]

    /**
     * The type hint of the referenced accessor or value.
     * __Should__ be specified in case the type hint for all child nodes and items is the same.
     * __Must__ not be specified otherwise.
     */
    typeHint?: ISdDtfTypeHint

    /** Additional properties are allowed. */
    [custom: string]: unknown

}
