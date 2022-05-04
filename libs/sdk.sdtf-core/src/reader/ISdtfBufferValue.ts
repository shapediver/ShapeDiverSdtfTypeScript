/**
 * Wrapper around a buffer value.
 *
 * @example
 * {
 *     id: "a64761bb-8c4e-4a4e-a0be-724925fa10cb",
 *     date: DataView { ... }
 * }
 */
export interface ISdtfBufferValue {

    /** Optional id that was specified in the accessor */
    id?: string,

    /** Holds the referenced buffer data */
    data: DataView

}
