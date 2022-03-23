import { ISdDtfAsset } from "../components/ISdDtfAsset"

/** Parser for sdTF assets. */
export interface ISdDtfParser {

    /**
     * Parses the sdTF-file with the given path.
     *
     * __WARNING:__
     * This function is only supported in Node.js!
     * @param path - Absolute or relative path of the sdTF file.
     * @throws {@link SdDtfError} when the sdTF-file could not be parsed.
     */
    readFromFile (path: string): ISdDtfAsset

    /**
     * Fetches the sdTF-file from the given link and returns the parsing results.
     * @param url - Location of the sdTF-file.
     * @throws {@link SdDtfError} when the sdTF-file could not be parsed.
     */
    readFromUrl (url: string): Promise<ISdDtfAsset>

    /**
     * Parses the sdTF-file with the given data.
     * @throws {@link SdDtfError} when the sdTF-file could not be parsed.
     */
    readFromBuffer (buffer: ArrayBuffer): ISdDtfAsset

}
