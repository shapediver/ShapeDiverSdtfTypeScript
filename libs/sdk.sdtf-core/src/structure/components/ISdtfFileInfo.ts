import { ISdtfBaseComponent } from './ISdtfBaseComponent';

/** Representation of a [sdTF file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo). */
export interface ISdtfFileInfo extends ISdtfBaseComponent {
    /** Holder of Copyright of the file. */
    copyright?: string;

    /** Hint to software package that generated the sdTF asset. */
    generator?: string;

    /** The version of this sdTF asset. */
    version: string;

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>;
}
