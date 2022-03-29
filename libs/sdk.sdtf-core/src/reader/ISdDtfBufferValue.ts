/** Wrapper around a buffer value */
export interface ISdDtfBufferValue {

    /** Optional id that was specified in the accessor */
    id?: string,

    /** Holds the referenced buffer data */
    data: DataView

}
