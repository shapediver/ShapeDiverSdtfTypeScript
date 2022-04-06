import { ISdDtfBaseComponent } from "../../structure/components/ISdDtfBaseComponent"

/** Wrapper around interface extension of a writable sdTF base component. */
export type SdDtfWriteableBase<T extends ISdDtfBaseComponent> =
    Partial<Omit<T, "toJson">>
    & { readonly componentId: string }  // Component id must exist


/** Base for writeable data object */
export interface ISdDtfBaseWriteableComponent {

    /** Unique id of the component instance. */
    readonly componentId: string

    /** Returns the JSON representation of the component. */
    toDataObject (): Record<string, unknown>

}
