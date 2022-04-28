import { ISdtfWriteableAsset, ISdtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-core"
import { ISdtfGrasshopperSdtfBuilder } from "./builder/ISdtfGrasshopperSdtfBuilder"
import { SdtfGrasshopperSdtfBuilder } from "./builder/SdtfGrasshopperSdtfBuilder"
import { ISdtfWriter, ISdtfWriterAttributes, ISdtfWriterDataItems } from "./ISdtfWriter"

export class SdtfWriter implements ISdtfWriter {

    constructor (
        private readonly factory: ISdtfWriteableComponentFactory,
    ) {
    }

    createSimpleDataSdtf (chunkName: string, data: ISdtfWriterDataItems[]): ISdtfWriteableAsset {
        // Helper to convert the format of attributes data
        const mapAttributesData = (attr: ISdtfWriterAttributes[]): Record<string, [ unknown, string | undefined ]> => {
            const res: Record<string, [ unknown, string | undefined ]> = {}
            attr.forEach(data => res[data.name] = [ data.content, data.typeHint ])
            return res
        }

        const chunk = this.factory.createChunk(chunkName)

        data.forEach(d => {
            const dataItem = this.factory.createDataItem(d.content, d.typeHint)
            if (d.attributes) dataItem.attributes = this.factory.createAttributes(mapAttributesData(d.attributes))
            chunk.items.push(dataItem)
        })

        const asset = this.factory.createAsset()
        asset.chunks.push(chunk)

        return asset
    }

    createGrasshopperSdtfBuilder (): ISdtfGrasshopperSdtfBuilder {
        return new SdtfGrasshopperSdtfBuilder(this.factory)
    }

}
