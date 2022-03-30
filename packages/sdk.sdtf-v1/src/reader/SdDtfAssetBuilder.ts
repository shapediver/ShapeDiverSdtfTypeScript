import { isDataObject, ISdDtfAsset, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"
import { SdDtfAsset } from "../components/SdDtfAsset"
import { ISdDtfAssetBuilder } from "./ISdDtfAssetBuilder"
import { ISdDtfComponentFactory } from "./ISdDtfComponentFactory"
import { ISdDtfDataParser } from "./ISdDtfDataParser"
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
        dataParser: ISdDtfDataParser,
    ) {
        this.asset = new SdDtfAsset()
        this.factory = new SdDtfComponentFactory(dataParser)
    }

    buildAccessor (): this {
        this.buildComponent(
            this.PROPERTY_NAME_ACCESSORS,
            (data: Record<string, unknown>, i) => {
                const accessor = this.factory.createAccessor(
                    data,
                    this.asset.bufferViews,
                )
                accessor.componentId = i
                this.asset.accessors.push(accessor)
            },
        )

        return this
    }

    buildAttributes (): this {
        this.buildComponent(
            this.PROPERTY_NAME_ATTRIBUTES,
            (data: Record<string, unknown>, i) => {
                const attributes = this.factory.createAttribute(
                    data,
                    this.asset.accessors,
                    this.asset.typeHints,
                )
                attributes.componentId = i
                this.asset.attributes.push(attributes)
            },
        )

        return this
    }

    buildBuffer (): this {
        this.buildComponent(
            this.PROPERTY_NAME_BUFFERS,
            (data: Record<string, unknown>, i) => {
                const buffer = this.factory.createBuffer(data, this.bufferCache)
                buffer.componentId = i
                this.asset.buffers.push(buffer)
            },
        )

        return this
    }

    buildBufferView (): this {
        this.buildComponent(
            this.PROPERTY_NAME_BUFFER_VIEWS,
            (data: Record<string, unknown>, i) => {
                const bufferView = this.factory.createBufferView(
                    data,
                    this.asset.buffers,
                )
                bufferView.componentId = i
                this.asset.bufferViews.push(bufferView)
            },
        )

        return this
    }

    buildChunks (): this {
        this.buildComponent(
            this.PROPERTY_NAME_CHUNKS,
            (data: Record<string, unknown>, i) => {
                const chunk = this.factory.createChunk(
                    data,
                    this.asset.attributes,
                    this.asset.items,
                    this.asset.nodes,
                    this.asset.typeHints,
                )
                chunk.componentId = i
                this.asset.chunks.push(chunk)
            },
        )

        return this
    }

    buildDataItem (): this {
        this.buildComponent(
            this.PROPERTY_NAME_DATA_ITEMS,
            (data: Record<string, unknown>, i) => {
                const dataItem = this.factory.createDataItem(
                    data,
                    this.asset.accessors,
                    this.asset.attributes,
                    this.asset.typeHints,
                )
                dataItem.componentId = i
                this.asset.items.push(dataItem)
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
            (data: Record<string, unknown>, i) => {
                const node = this.factory.createNode(
                    data,
                    this.asset.attributes,
                    this.asset.items,
                    this.asset.typeHints,
                )
                node.componentId = i
                this.asset.nodes.push(node)
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
            (data: Record<string, unknown>, i) => {
                const typeHint = this.factory.createTypeHint(data)
                typeHint.componentId = i
                this.asset.typeHints.push(typeHint)
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
    buildComponent (propertyName: string, createFn: (data: Record<string, unknown>, i: number) => void): void {
        const componentDataArray = this.content[propertyName]
        if (componentDataArray === undefined) return
        if (!Array.isArray(componentDataArray)) throw new SdDtfError(`Invalid content property: '${ propertyName }' must be an array.`)

        componentDataArray.forEach((componentDataItem: unknown, i) => {
            if (!isDataObject(componentDataItem)) throw new SdDtfError(`Invalid item at ${ propertyName }[${ i }]: Item must be an object.`)
            createFn(componentDataItem, i)
        })
    }

}
