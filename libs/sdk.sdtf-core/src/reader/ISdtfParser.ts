import { ISdtfReadableAsset } from './components/ISdtfReadableAsset';

/** Parser for sdTF assets. */
export interface ISdtfParser {
    /**
     * Parses the sdTF-file with the given path.
     *
     * __WARNING:__ This function is only supported in Node.js!
     * @param path - Absolute or relative path of the sdTF file.
     * @throws {@link SdtfError} when the sdTF-file could not be parsed.
     */
    readFromFile(path: string): Promise<ISdtfReadableAsset>;

    /**
     * Fetches the sdTF-file from the given link and returns the parsing results.
     * @param url - Location of the sdTF-file.
     * @throws {@link SdtfError} when the sdTF-file could not be parsed.
     */
    readFromUrl(url: string): Promise<ISdtfReadableAsset>;

    /**
     * Parses the sdTF-file with the given data.
     * @throws {@link SdtfError} when the sdTF-file could not be parsed.
     */
    readFromBuffer(sdtf: ArrayBuffer): ISdtfReadableAsset;
}
