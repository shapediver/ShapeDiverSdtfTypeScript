/** Handles parsing and construction of the three sdTF file parts: _Header_, _JSON content_ and _binary body_. */
export interface ISdDtfBinarySdtf {

    /** Constructs a binary sdTF file as a buffer object from the given content and body. */
    constructBinarySdtf (content: Record<string, unknown>, body: ArrayBuffer): ArrayBuffer

    /** Parses the given buffer data that holds a binary sdTF and returns its content and body. */
    parseBinarySdtf (sdtf: ArrayBuffer): [ Record<string, unknown>, ArrayBuffer ]

}
