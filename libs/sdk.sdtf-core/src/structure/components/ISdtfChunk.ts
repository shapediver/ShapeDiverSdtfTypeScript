import { ISdtfNode } from "./ISdtfNode"

/** Representation of a [sdTF chunk](https://github.com/shapediver/sdTF/tree/development/specification/1.0#chunk). */
export interface ISdtfChunk extends ISdtfNode {

    name: string

}
