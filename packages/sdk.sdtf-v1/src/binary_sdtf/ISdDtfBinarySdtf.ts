import { ISdDtfComponentList } from "../structure/ISdDtfComponentList"

/** Handles parsing and construction of the three sdTF file parts: _Header_, _JSON content_ and _binary body_. */
export interface ISdDtfBinarySdtf {

    readonly binaryHeaderLength: number

    /** Constructs a new binary sdTF file from the given component list. */
    constructBinarySdtf (componentList: ISdDtfComponentList): ArrayBuffer

    /**
     * Parses the given buffer data that holds a binary sdTF and returns its JSON content and body as buffers.
     * @returns - [ JSON content buffer, binary body buffer ]
     */
    parseBinarySdtf (sdtf: ArrayBuffer): [ DataView, DataView ]

    /**
     * Parses the given sdTF header and validates its parts.
     * @returns - [ content length, total length ]
     * @throws {@link SdDtfError} when the validation fails.
     */
    readHeader (header: DataView | ArrayBuffer): [ number, number ]

    /**
     * Encodes and parses the given sdTF JSON content buffer.
     * @throws {@link SdDtfError} when parsing of the content fails.
     */
    readJsonContent (jsonContent: DataView | ArrayBuffer): Record<string, unknown>

}
