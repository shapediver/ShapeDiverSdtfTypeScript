import { ISdtfBaseComponent } from "./ISdtfBaseComponent"

/** Representation of a [sdTF node](https://github.com/shapediver/sdTF/tree/development/specification/1.0#node). */
export interface ISdtfNode extends ISdtfBaseComponent {

    /** Holds the positional index of the referenced attributes object in the sdTF asset structure. */
    attributes?: number

    /** Holds the positional index of the referenced data item objects in the sdTF asset structure. */
    items: number[]

    /**
     * Optional name of the node.
     * A name __must__ be set for top level nodes ({@link ISdtfChunk}).
     * Nodes on the second level __may__ have a name, which typically corresponds to a string representation of the path
     * of a branch of a Grasshopper tree.
     */
    name?: string

    /** Holds the positional index of the referenced node objects in the sdTF asset structure. */
    nodes: number[]

    /** Holds the positional index of the referenced type hint object in the sdTF asset structure. */
    typeHint?: number

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
