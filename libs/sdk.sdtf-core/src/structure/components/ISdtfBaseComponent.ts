/** Base for plain data object */
export interface ISdtfBaseComponent {

    /** Unique id of the component instance. */
    readonly componentId: string

    /** Returns the JSON representation of the component. */
    toJson (): Record<string, unknown>

}
