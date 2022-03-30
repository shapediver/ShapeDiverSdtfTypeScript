import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"

/** Contains meta information about asset file. */
export interface ISdDtfFileInfo extends ISdDtfBaseComponent {

    /** Holder of Copyright of the file. */
    copyright?: string

    /** Hint to software package that generated the sdTF asset. */
    generator?: string

    /** The version of this sdTF asset. */
    version: string

    /** Additional properties are allowed. */
    [custom: string]: unknown

}
