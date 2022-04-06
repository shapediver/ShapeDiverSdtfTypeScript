import { ISdDtfWriteableAsset, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core"

export interface ISdDtfWriterAttributes {
    name: string
    content: unknown,
    typeHint?: string,
}

export interface ISdDtfWriterDataItems {

    content: unknown,

    typeHint?: SdDtfTypeHintName | string,

    attributes?: ISdDtfWriterAttributes[]

}

/** A high-level asset builder that allows to create simple sdTF structures directly from data. */
export interface ISdDtfWriter {

    /**
     * TODO reformulate!
     * Creates a simple linear sdTF that consists of a single sdTF chunk that holds all data.
     * The data content is either stored directly in the sdTF JSON content or in the sdTF buffer, depending on the
     * type Hint of the respective content item and the loaded integrations.
     */
    createSimpleDataSdtf (chunkName: string, chunkAttributes: ISdDtfWriterAttributes[], data: ISdDtfWriterDataItems[]): ISdDtfWriteableAsset

}
