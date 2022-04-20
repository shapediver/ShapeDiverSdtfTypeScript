import { ISdDtfWriteableAsset, ISdDtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-core"
import { ISdDtfWriter, ISdDtfWriterAttributes, ISdDtfWriterDataItems } from "./ISdDtfWriter"

export class SdDtfWriter implements ISdDtfWriter {

    constructor (
        private readonly factory: ISdDtfWriteableComponentFactory,
    ) {
    }

    createSimpleDataSdtf (chunkName: string, chunkAttributes: ISdDtfWriterAttributes[], data: ISdDtfWriterDataItems[]): ISdDtfWriteableAsset {
        // Helper to convert the format of attributes data
        const mapAttributesData = (attr: ISdDtfWriterAttributes[]): Record<string, [ unknown, string | undefined ]> => {
            const res: Record<string, [ unknown, string | undefined ]> = {}
            attr.forEach(data => res[data.name] = [ data.content, data.typeHint ])
            return res
        }

        const chunk = this.factory.createChunk(chunkName)
        chunk.attributes = this.factory.createAttributes(mapAttributesData(chunkAttributes))

        data.forEach(d => {
            const dataItem = this.factory.createDataItem(d.content, d.typeHint)
            if (d.attributes) dataItem.attributes = this.factory.createAttributes(mapAttributesData(d.attributes))
            chunk.items.push(dataItem)
        })

        const asset = this.factory.createAsset()
        asset.chunks.push(chunk)

        return asset
    }

}
