import { isDataObject, ISdDtfReadableAsset, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfComponentValidator } from "../validation/ISdDtfComponentValidator"
import { SdDtfComponentValidator } from "../validation/SdDtfComponentValidator"
import { ISdDtfWriteableComponentList } from "../writer/ISdDtfWriteableComponentList"
import { ISdDtfComponentFactory } from "./ISdDtfComponentFactory"
import { ISdDtfComponentList, ISdDtfPartialComponentList } from "./ISdDtfComponentList"
import { SdDtfComponentFactory } from "./SdDtfComponentFactory"

export class SdDtfComponentFactoryWrapper implements SdDtfComponentFactoryWrapper {

    private readonly factory: ISdDtfComponentFactory

    constructor () {
        this.factory = new SdDtfComponentFactory()
    }

    createFromJson (json: Record<string, unknown>): ISdDtfComponentList {
        const f = this.factory  // Alias to shorten lines
        return this.createComponentList({
            accessors: this.buildFromArray(json, f.propertyNameAccessors, f.createAccessor.bind(f)),
            asset: this.buildFromObject(json, "", f.createAsset.bind(f)),
            attributes: this.buildFromArray(json, f.propertyNameAttributes, f.createAttributes.bind(f)),
            buffers: this.buildFromArray(json, f.propertyNameBuffers, f.createBuffer.bind(f)),
            bufferViews: this.buildFromArray(json, f.propertyNameBufferViews, f.createBufferView.bind(f)),
            chunks: this.buildFromArray(json, f.propertyNameChunks, f.createChunk.bind(f)),
            items: this.buildFromArray(json, f.propertyNameDataItems, f.createDataItem.bind(f)),
            fileInfo: this.buildFromObject(json, f.propertyNameFileInfo, f.createFileInfo.bind(f)),
            nodes: this.buildFromArray(json, f.propertyNameNodes, f.createNode.bind(f)),
            typeHints: this.buildFromArray(json, f.propertyNameTypeHints, f.createTypeHint.bind(f)),
        })
    }

    createFromReadable (readableAsset: ISdDtfReadableAsset): ISdDtfComponentList {
        const f = this.factory  // Alias to shorten lines
        const partialComponentList: ISdDtfPartialComponentList = {
            accessors: readableAsset.accessors.map(a => f.createAccessor(a.toDataObject())),
            asset: f.createAsset(readableAsset.toDataObject()),
            attributes: readableAsset.attributes.map(a => f.createAttributes(a.toDataObject())),
            buffers: readableAsset.buffers.map(b => f.createBuffer(b.toDataObject())),
            bufferViews: readableAsset.bufferViews.map(b => f.createBufferView(b.toDataObject())),
            chunks: readableAsset.chunks.map(c => f.createChunk(c.toDataObject())),
            items: readableAsset.items.map(i => f.createDataItem(i.toDataObject())),
            fileInfo: f.createFileInfo(readableAsset.fileInfo.toDataObject()),
            nodes: readableAsset.nodes.map(n => f.createNode(n.toDataObject())),
            typeHints: readableAsset.typeHints.map(y => f.createTypeHint(y.toDataObject())),
        }

        this.mapHierarchyRepresentation(partialComponentList, readableAsset)
        return this.createComponentList(partialComponentList)
    }

    createFromWriteable (writeableComponents: ISdDtfWriteableComponentList): ISdDtfComponentList {
        const f = this.factory  // Alias to shorten lines
        const partialComponentList: ISdDtfPartialComponentList = {
            accessors: writeableComponents.accessors.map(a => f.createAccessor(a.toDataObject())),
            asset: f.createAsset(writeableComponents.asset.toDataObject()),
            attributes: writeableComponents.attributes.map(a => f.createAttributes(a.toDataObject())),
            buffers: writeableComponents.buffers.map(b => f.createBuffer(b.toDataObject())),
            bufferViews: writeableComponents.bufferViews.map(b => f.createBufferView(b.toDataObject())),
            chunks: writeableComponents.chunks.map(c => f.createChunk(c.toDataObject())),
            items: writeableComponents.items.map(i => f.createDataItem(i.toDataObject())),
            fileInfo: f.createFileInfo(writeableComponents.fileInfo.toDataObject()),
            nodes: writeableComponents.nodes.map(n => f.createNode(n.toDataObject())),
            typeHints: writeableComponents.typeHints.map(t => f.createTypeHint(t.toDataObject())),
            // The writeable-optimizer merges all buffers, thus there is only a single binary buffer
            binaryBody: writeableComponents.buffers.find(buffer => !buffer.uri)?.data,
        }

        this.mapHierarchyRepresentation(partialComponentList, writeableComponents)
        return this.createComponentList(partialComponentList)
    }

    /**
     * Validates every partial-component and returns a corresponding component list.
     * @private
     * @throws {@link SdDtfError} when a partial-component is invalid.
     */
    createComponentList (partialComponents: ISdDtfPartialComponentList): ISdDtfComponentList {
        const validator: ISdDtfComponentValidator = new SdDtfComponentValidator(partialComponents)

        // NOTE the validation order is important here!
        const asset = partialComponents.asset
        validator.validateAsset(asset)

        const fileInfo = partialComponents.fileInfo
        validator.validateFileInfo(fileInfo)

        const buffers = partialComponents.buffers.map(b => {
            validator.validateBuffer(b)
            return b
        })
        const bufferViews = partialComponents.bufferViews.map(b => {
            validator.validateBufferView(b)
            return b
        })
        const accessors = partialComponents.accessors.map(a => {
            validator.validateAccessor(a)
            return a
        })
        const typeHints = partialComponents.typeHints.map(t => {
            validator.validateTypeHint(t)
            return t
        })
        const attributes = partialComponents.attributes.map(a => {
            validator.validateAttributes(a)
            return a
        })
        const chunks = partialComponents.chunks.map(c => {
            validator.validateChunk(c)
            return c
        })
        const dataItems = partialComponents.items.map(d => {
            validator.validateDataItem(d)
            return d
        })
        const nodes = partialComponents.nodes.map(n => {
            validator.validateNode(n)
            return n
        })

        return {
            accessors,
            asset,
            attributes,
            buffers,
            bufferViews,
            chunks,
            items: dataItems,
            nodes,
            typeHints,
            fileInfo,
            binaryBody: partialComponents.binaryBody,
        }
    }

    /**
     * Validation wrapper around the given create function for a content object of the specified name.
     * @private
     * @throws {@link SdDtfError} when something goes wrong.
     */
    buildFromObject<T> (
        jsonObject: Record<string, unknown>,
        propertyName: string,
        createFn: (data: Record<string, unknown>) => T,
    ): T {
        const componentDataObject = (propertyName) ? jsonObject[propertyName] : jsonObject
        if (!isDataObject(componentDataObject)) throw new SdDtfError(`Invalid item at ${ propertyName }: Item must be an object.`)
        return createFn(componentDataObject)
    }

    /**
     * Validation wrapper around the given create function for a content array of the specified name.
     * @private
     * @throws {@link SdDtfError} when something goes wrong.
     */
    buildFromArray<T> (
        jsonArray: Record<string, unknown>,
        propertyName: string,
        createFn: (data: Record<string, unknown>) => T,
    ): T[] {
        const componentDataArray = jsonArray[propertyName]
        if (componentDataArray === undefined) return []
        if (!Array.isArray(componentDataArray)) throw new SdDtfError(`Invalid content property: '${ propertyName }' must be an array.`)

        return componentDataArray.map((componentDataItem: unknown, i) => {
            if (!isDataObject(componentDataItem)) throw new SdDtfError(`Invalid item at ${ propertyName }[${ i }]: Item must be an object.`)
            return createFn(componentDataItem)
        })
    }

    /**
     * Readable and writeable components use object references to represent the hierarchy.
     * However, sdTF components use reference IDs for this.
     * This method maps the object representation into a reference ID representation.
     * @private
     */
    mapHierarchyRepresentation (target: ISdDtfPartialComponentList, src: ISdDtfWriteableComponentList | ISdDtfReadableAsset): void {
        // Helper to find the element position in an array
        const getIndex = (list: { componentId: string }[], componentId?: string) => {
            if (!componentId) return -1
            return list.findIndex((c) => c.componentId === componentId)
        }

        target.asset.fileInfo = 0

        target.accessors.forEach((accessor, index) => {
            const srcComponent = src.accessors[index]
            accessor.bufferView = getIndex(src.bufferViews, srcComponent?.bufferView?.componentId)
        })
        target.attributes.forEach((attributes, index) => {
            if (!attributes.entries) return
            Object.entries(attributes.entries).forEach(([ name, attribute ]) => {
                const srcComponent = src.attributes[index].entries[name]
                if (srcComponent.accessor) attribute.accessor = getIndex(src.accessors, srcComponent?.accessor?.componentId)
                if (srcComponent.typeHint) attribute.typeHint = getIndex(src.typeHints, srcComponent?.typeHint?.componentId)
            })
        })
        target.bufferViews.forEach((bufferView, index) => {
            const srcComponent = src.bufferViews[index]
            bufferView.buffer = getIndex(src.buffers, srcComponent?.buffer?.componentId)
        })
        target.chunks.forEach((chunk, index) => {
            const srcComponent = src.chunks[index]
            if (srcComponent.attributes) chunk.attributes = getIndex(src.attributes, srcComponent?.attributes?.componentId)
            chunk.items = srcComponent.items.map(item => getIndex(src.items, item?.componentId))
            chunk.nodes = srcComponent.nodes.map(node => getIndex(src.nodes, node?.componentId))
            if (srcComponent.typeHint) chunk.typeHint = getIndex(src.typeHints, srcComponent?.typeHint?.componentId)
        })
        target.items.forEach((dataItem, index) => {
            const srcComponent = src.items[index]
            if (srcComponent.accessor) dataItem.accessor = getIndex(src.accessors, srcComponent?.accessor?.componentId)
            if (srcComponent.attributes) dataItem.attributes = getIndex(src.attributes, srcComponent?.attributes?.componentId)
            if (srcComponent.typeHint) dataItem.typeHint = getIndex(src.typeHints, srcComponent?.typeHint?.componentId)
        })
        target.nodes.forEach((node, index) => {
            const srcComponent = src.nodes[index]
            if (srcComponent.attributes) node.attributes = getIndex(src.attributes, srcComponent?.attributes?.componentId)
            node.items = srcComponent.items.map(item => getIndex(src.items, item?.componentId))
            node.nodes = srcComponent.nodes.map(node => getIndex(src.nodes, node?.componentId))
            if (srcComponent.typeHint) node.typeHint = getIndex(src.typeHints, srcComponent?.typeHint?.componentId)
        })
    }

}
