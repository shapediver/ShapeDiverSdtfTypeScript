import { ISdDtfBaseComponent } from "../../structure/components/ISdDtfBaseComponent"

/** Wrapper around interface extension of a readable sdTF base component. */
export type SdDtfReadableBase<T extends ISdDtfBaseComponent> = Omit<T, "toJson">

/** Base for readable data object */
export interface ISdDtfReadableBaseComponent {

    /** Unique id of the component instance. */
    readonly componentId: string

    /** Returns the JSON representation of the component. */
    toDataObject (): Record<string, unknown>

}
