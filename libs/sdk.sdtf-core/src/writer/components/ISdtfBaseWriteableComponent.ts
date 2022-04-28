import { ISdtfBaseComponent } from "../../structure/components/ISdtfBaseComponent"

/** Wrapper around interface extension of a writable sdTF base component. */
export type SdtfWriteableBase<T extends ISdtfBaseComponent> =
    Partial<Omit<T, "toJson">>
    & { readonly componentId: string }  // Component id must exist


/** Base for writeable data object */
export interface ISdtfBaseWriteableComponent {

    /** Unique id of the component instance. */
    readonly componentId: string

    /** Returns the JSON representation of the component. */
    toDataObject (): Record<string, unknown>

}
