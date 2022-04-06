import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"

/** Represents a [sdTf](https://github.com/shapediver/sdTF/tree/development/specification/1.0) (Standard Data Transfer Format). */
export interface ISdDtfAsset extends ISdDtfBaseComponent {

    /** Holds the positional index of the referenced file info object in the sdTF asset structure. */
    fileInfo: number

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
