import { ISdtfWriteableAsset, SdtfTypeHintName } from "@shapediver/sdk.sdtf-core"
import { ISdtfGrasshopperSdtfBuilder } from "./builder/ISdtfGrasshopperSdtfBuilder"

export interface ISdtfWriterAttributes {
    name: string

    content: unknown | { data: ArrayBuffer, contentType: string },

    typeHint?: SdtfTypeHintName | string,
}

export interface ISdtfWriterDataItems {

    content: unknown | { data: ArrayBuffer, contentType: string },

    typeHint?: SdtfTypeHintName | string,

    attributes?: ISdtfWriterAttributes[]

}

/** A high-level asset builder that allows to create simple sdTF structures directly from data. */
export interface ISdtfWriter {

    /**
     * Creates a simple linear sdTF that consists of a single chunk with one or more data nodes.
     * The given data content is either stored directly in the sdTF JSON content or in the sdTF buffer.
     */
    createSimpleDataSdtf (chunkName: string, data: ISdtfWriterDataItems[]): ISdtfWriteableAsset

    /**
     * Returns a new builder instance to create a grasshopper sdTF asset.
     * This sdTF asset includes chunks that are readable by the ShapeDiver Grasshopper input component.
     */
    createGrasshopperSdtfBuilder (): ISdtfGrasshopperSdtfBuilder

}
