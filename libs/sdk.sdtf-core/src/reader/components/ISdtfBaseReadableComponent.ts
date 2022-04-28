import { ISdtfBaseComponent } from "../../structure/components/ISdtfBaseComponent"

/** Wrapper around interface extension of a readable sdTF base component. */
export type SdtfReadableBase<T extends ISdtfBaseComponent> = Omit<T, "toJson">

/** Base for readable data object */
export interface ISdtfBaseReadableComponent {

    /** Unique id of the component instance. */
    readonly componentId: string

    /** Returns the JSON representation of the component. */
    toDataObject (): Record<string, unknown>

}
