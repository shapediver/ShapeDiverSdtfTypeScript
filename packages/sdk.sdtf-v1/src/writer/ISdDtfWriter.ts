import { ISdDtfWriteableAsset, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core"
import { ISdDtfGrasshopperSdtfBuilder } from "./builder/ISdDtfGrasshopperSdtfBuilder"

export interface ISdDtfWriterAttributes {
    name: string

    content: unknown | { data: ArrayBuffer, contentType: string },

    typeHint?: SdDtfTypeHintName | string,
}

export interface ISdDtfWriterDataItems {

    content: unknown | { data: ArrayBuffer, contentType: string },

    typeHint?: SdDtfTypeHintName | string,

    attributes?: ISdDtfWriterAttributes[]

}

/** A high-level asset builder that allows to create simple sdTF structures directly from data. */
export interface ISdDtfWriter {

    /**
     * Creates a simple linear sdTF that consists of a single chunk with one or more data nodes.
     * The given data content is either stored directly in the sdTF JSON content or in the sdTF buffer.
     */
    createSimpleDataSdtf (chunkName: string, data: ISdDtfWriterDataItems[]): ISdDtfWriteableAsset

    /**
     * Returns a new builder instance to create a grasshopper sdTF asset.
     * This sdTF asset includes chunks that are readable by the ShapeDiver Grasshopper input component.
     */
    createGrasshopperSdtfBuilder (): ISdDtfGrasshopperSdtfBuilder

}
