import { ISdDtfAsset, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"
import { SdDtfAsset } from "../components/SdDtfAsset"
import { isDataObject } from "../typeGuards"
import { ISdDtfAssetBuilder } from "./ISdDtfAssetBuilder"
import { ISdDtfComponentFactory } from "./ISdDtfComponentFactory"
import { SdDtfComponentFactory } from "./SdDtfComponentFactory"

export class SdDtfAssetBuilder implements ISdDtfAssetBuilder {

    readonly PROPERTY_NAME_ACCESSORS = "accessors"
    readonly PROPERTY_NAME_ATTRIBUTES = "attributes"
    readonly PROPERTY_NAME_BUFFER_VIEWS = "bufferViews"
    readonly PROPERTY_NAME_BUFFERS = "buffers"
    readonly PROPERTY_NAME_CHUNKS = "chunks"
    readonly PROPERTY_NAME_DATA_ITEMS = "items"
    readonly PROPERTY_NAME_FILE_INFO = "asset"
    readonly PROPERTY_NAME_NODES = "nodes"
    readonly PROPERTY_NAME_TYPEHINTS = "typeHints"

    readonly asset: ISdDtfAsset
    readonly factory: ISdDtfComponentFactory

    constructor (
        private readonly content: Record<string, unknown>,
        private readonly bufferCache: ISdDtfBufferCache,
    ) {
        this.asset = new SdDtfAsset()
        this.factory = new SdDtfComponentFactory()
    }

    buildAccessor (): this {
        this.buildComponent(
            this.PROPERTY_NAME_ACCESSORS,
            (data: Record<string, unknown>) => {
                this.asset.accessors.push(this.factory.createAccessor(
                    data,
                    this.asset.bufferViews,
                ))
            },
        )

        return this
    }

    buildAttributes (): this {
        this.buildComponent(
            this.PROPERTY_NAME_ATTRIBUTES,
            (data: Record<string, unknown>) => {
                this.asset.attributes.push(this.factory.createAttribute(
                    data,
                    this.asset.accessors,
                    this.asset.typeHints,
                ))
            },
        )

        return this
    }

    buildBuffer (): this {
        this.buildComponent(
            this.PROPERTY_NAME_BUFFERS,
            (data: Record<string, unknown>) => {
                this.asset.buffers.push(this.factory.createBuffer(data, this.bufferCache))
            },
        )

        return this
    }

    buildBufferView (): this {
        this.buildComponent(
            this.PROPERTY_NAME_BUFFER_VIEWS,
            (data: Record<string, unknown>) => {
                this.asset.bufferViews.push(this.factory.createBufferView(
                    data,
                    this.asset.buffers,
                ))
            },
        )

        return this
    }

    buildChunks (): this {
        this.buildComponent(
            this.PROPERTY_NAME_CHUNKS,
            (data: Record<string, unknown>) => {
                this.asset.chunks.push(this.factory.createChunk(
                    data,
                    this.asset.attributes,
                    this.asset.items,
                    this.asset.nodes,
                    this.asset.typeHints,
                ))
            },
        )

        return this
    }

    buildDataItem (): this {
        this.buildComponent(
            this.PROPERTY_NAME_DATA_ITEMS,
            (data: Record<string, unknown>) => {
                this.asset.items.push(this.factory.createDataItem(
                    data,
                    this.asset.accessors,
                    this.asset.attributes,
                    this.asset.typeHints,
                ))
            },
        )

        return this
    }

    buildFileInfo (): this {
        const fileInfoData = this.content[this.PROPERTY_NAME_FILE_INFO]
        if (fileInfoData === undefined) return this

        if (!isDataObject(fileInfoData)) throw new SdDtfError(`Invalid property ${ this.PROPERTY_NAME_FILE_INFO }: Property must be an object.`)
        this.asset.fileInfo = this.factory.createFileInfo(fileInfoData)

        return this
    }

    buildNode (): this {
        this.buildComponent(
            this.PROPERTY_NAME_NODES,
            (data: Record<string, unknown>) => {
                this.asset.nodes.push(this.factory.createNode(
                    data,
                    this.asset.attributes,
                    this.asset.items,
                    this.asset.typeHints,
                ))
            },
        )

        // The builder cannot set the node references before all nodes have been created.
        // Thus, we have to call it explicitly.
        //
        // Note: We can cast the content data because it was already validated!
        this.factory.setNodeReferences(<Record<string, unknown>[]>this.content[this.PROPERTY_NAME_NODES], this.asset.nodes)

        return this
    }

    buildTypeHint (): this {
        this.buildComponent(
            this.PROPERTY_NAME_TYPEHINTS,
            (data: Record<string, unknown>) => {
                this.asset.typeHints.push(this.factory.createTypeHint(data))
            },
        )

        return this
    }

    getResult (): ISdDtfAsset {
        return this.asset
    }

    /**
     * Validation wrapper around the given create function for the specified content property.
     * @private
     * @throws {@link SdDtfError} when something goes wrong.
     */
    buildComponent (propertyName: string, createFn: (data: Record<string, unknown>) => void): void {
        const componentDataArray = this.content[propertyName]
        if (componentDataArray === undefined) return
        if (!Array.isArray(componentDataArray)) throw new SdDtfError(`Invalid content property: '${ propertyName }' must be an array.`)

        componentDataArray.forEach((componentDataItem: unknown, i) => {
            if (!isDataObject(componentDataItem)) throw new SdDtfError(`Invalid item at ${ propertyName }[${ i }]: Item must be an object.`)
            createFn(componentDataItem)
        })
    }

}
