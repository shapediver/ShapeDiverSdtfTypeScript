import { ISdtfBaseComponent } from './ISdtfBaseComponent';

/** Representation of a [sdTF attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1). */
export interface ISdtfAttributes extends ISdtfBaseComponent {
    entries: Record<string, ISdtfAttribute>;
}

/** The value of a single attributes dictionary key */
export interface ISdtfAttribute {
    /** Holds the positional index of the referenced accessor object in the sdTF asset structure. */
    accessor?: number;

    /** Holds the positional index of the referenced type hint object in the sdTF asset structure. */
    typeHint?: number;

    /** Embedded representation of the data item, used for primitive values. */
    value?: unknown;

    /** Returns the JSON representation of the component. */
    toJson(): Record<string, unknown>;
}
