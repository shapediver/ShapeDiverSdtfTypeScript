import { ISdDtfNode } from "./ISdDtfNode"

/** Representation of a [sdTF chunk](https://github.com/shapediver/sdTF/tree/development/specification/1.0#chunk). */
export interface ISdDtfChunk extends ISdDtfNode {

    name: string

}
