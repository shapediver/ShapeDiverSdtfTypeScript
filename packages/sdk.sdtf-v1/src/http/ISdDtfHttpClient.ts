export interface ISdDtfHttpClient {

    /**
     * Fetches the sdTF JSON content from the given URL.
     *
     * The client tries to minimize the amount of data sent by using HTTP range requests.
     * However, whether this is supported depends on the server.
     * If range requests are supported, only the `sdTF JSON content` is fetched and returned.
     * Otherwise, the entire sdTF file is fetched.
     * In this case, the `sdTF JSON content` is returned, as well as the `sdTF binary buffer`.
     * @returns - [ sdTF JSON content, sdTF binary buffer ]
     * @throws {@link SdDtfError} when the request was not successful.
     */
    getJsonContent (): Promise<[ DataView, DataView | undefined ]>

    /**
     * Fetches the request part of the sdTF binary buffer.
     * The given `uri` is relative to the JSON content of the sdTF file.
     *
     * The client tries to minimize the amount of data sent by using HTTP range requests.
     * However, whether this is supported depends on the server.
     * If range requests are supported, only the requested `part of the binary buffer` is fetched and returned.
     * Otherwise, the entire sdTF binary buffer is fetched.
     * In this case, the requested `part of the binary buffer` is returned, as well as the `entire binary buffer`.
     * @param uri - URI relative to the sdTF JSON content.
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @returns - [ part of the binary buffer, entire binary buffer ]
     * @throws {@link SdDtfError} when the request was not successful.
     */
    getBinaryBuffer (uri: string | undefined, offset: number, length: number): Promise<[ DataView, ArrayBuffer | undefined ]>

}
