import { ISdDtfNode } from "./ISdDtfNode"

/**
 * Think of a chunk as a generalisation of the volatile data (`IGH_Structure`) of a Grasshopper parameter (IGH_Param).
 * A chunk references a list of nodes which corresponds to the branches of an `IGH_Structure`.
 * The "path" of each branch (as known from an `IGH_Structure`) becomes the name which can be attached to nodes.
 *
 * Each chunk __must__ have a name, as opposed to a node which __may__ have a name.
 */
export interface ISdDtfChunk extends ISdDtfNode {
}
