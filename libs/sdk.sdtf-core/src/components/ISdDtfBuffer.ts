/** A buffer is used to reference binary data. */
export interface ISdDtfBuffer {

    /** The length of the buffer in bytes. */
    byteLength: number

    /**
     * The URI of the buffer.
     * Relative paths are relative to the `.sddtf`-file.
     * Instead of referencing an external file, the URI can also be a data-uri.
     * Not set in case of the directly attached buffer used for _binary sdTF_.
     */
    uri?: string

    /** Additional properties are allowed. */
    [custom: string]: unknown

}
