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

    /**
     * Returns the specified part of the buffer.
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdDtfError} when the requested part is out of bounds.
     */
    getContent (offset: number, length: number): Promise<DataView>

}
