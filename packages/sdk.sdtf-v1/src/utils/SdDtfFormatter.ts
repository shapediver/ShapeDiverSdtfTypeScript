import { ISdDtfAsset } from "@shapediver/sdk.sdtf-core"

/** A little beautifier that re-formats data that is shown to the user. */
export class SdDtfFormatter {

    /** Simplifies the asset structure by removing all references. */
    prettifyAsset (asset: ISdDtfAsset): string {
        const json = {
            asset: asset.toJson(),
            chunks: asset.chunks.map(c => c.toJson()),
            nodes: asset.nodes.map(n => n.toJson()),
            items: asset.items.map(i => i.toJson()),
            attributes: asset.attributes.map(a => a.toJson()),
            typeHints: asset.typeHints.map(t => t.toJson()),
            accessors: asset.accessors.map(a => a.toJson()),
            bufferViews: asset.bufferViews.map(v => v.toJson()),
            buffers: asset.buffers.map(b => b.toJson()),
        }

        return JSON.stringify(json, undefined, 2)
    }

}
