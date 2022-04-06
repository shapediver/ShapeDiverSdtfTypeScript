import { ISdDtfReadableAsset } from "@shapediver/sdk.sdtf-core"
import { ISdDtfComponentFactoryWrapper } from "../structure/ISdDtfComponentFactoryWrapper"
import { SdDtfComponentFactoryWrapper } from "../structure/SdDtfComponentFactoryWrapper"
import { ISdDtfFormatter } from "./ISdDtfFormatter"

export class SdDtfFormatter implements ISdDtfFormatter {

    private readonly factory: ISdDtfComponentFactoryWrapper

    constructor () {
        this.factory = new SdDtfComponentFactoryWrapper()
    }

    prettifyAsset (asset: ISdDtfReadableAsset): string {
        const componentList = this.factory.createFromReadable(asset)

        const json = componentList.asset.toJson()
        json.asset = componentList.fileInfo.toJson()
        json.chunks = componentList.chunks.map(c => c.toJson())
        json.nodes = componentList.nodes.map(n => n.toJson())
        json.items = componentList.items.map(i => i.toJson())
        json.attributes = componentList.attributes.map(a => a.toJson())
        json.typeHints = componentList.typeHints.map(t => t.toJson())
        json.accessors = componentList.accessors.map(a => a.toJson())
        json.bufferViews = componentList.bufferViews.map(v => v.toJson())
        json.buffers = componentList.buffers.map(b => b.toJson())

        return JSON.stringify(json, undefined, 2)
    }

}
