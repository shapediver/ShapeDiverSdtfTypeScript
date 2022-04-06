import {
    ISdDtfWriteableAccessor,
    ISdDtfWriteableAsset,
    ISdDtfWriteableAttributes,
    ISdDtfWriteableBuffer,
    ISdDtfWriteableBufferView,
    ISdDtfWriteableChunk,
    ISdDtfWriteableDataItem,
    ISdDtfWriteableFileInfo,
    ISdDtfWriteableNode,
    ISdDtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"

export interface ISdDtfWriteableComponentList {

    accessors: ISdDtfWriteableAccessor[]

    asset: ISdDtfWriteableAsset

    attributes: ISdDtfWriteableAttributes[]

    buffers: ISdDtfWriteableBuffer[]

    bufferViews: ISdDtfWriteableBufferView[]

    chunks: ISdDtfWriteableChunk[]

    items: ISdDtfWriteableDataItem[]

    nodes: ISdDtfWriteableNode[]

    typeHints: ISdDtfWriteableTypeHint[]

    fileInfo: ISdDtfWriteableFileInfo

}

/** Extracts all referenced components from the writeable asset object and returns them as a component list. */
export function writeableComponentListFromAsset (asset: ISdDtfWriteableAsset): ISdDtfWriteableComponentList {
    // Helper function to add components to list if they are not already in the list
    const addToList = (component: { componentId: string } | undefined, array: { componentId: string }[]): void => {
        if (!component) return
        if (array.findIndex((c) => c.componentId === component.componentId) === -1)
            array.push(component)
    }

    const list: ISdDtfWriteableComponentList = {
        accessors: [],
        asset: asset,
        attributes: [],
        buffers: [],
        bufferViews: [],
        chunks: asset.chunks,
        items: [],
        nodes: [],
        typeHints: [],
        fileInfo: asset.fileInfo,
    }

    // NOTE: Extraction order matters!
    list.chunks.forEach(chunk => {
        addToList(chunk.attributes, list.attributes)
        chunk.items.forEach(item => addToList(item, list.items))
        chunk.nodes.forEach(node => addToList(node, list.nodes))
        addToList(chunk.typeHint, list.typeHints)
    })
    list.nodes.forEach(nodes => {
        addToList(nodes.attributes, list.attributes)
        nodes.items.forEach(item => addToList(item, list.items))
        nodes.nodes.forEach(node => addToList(node, list.nodes))
        addToList(nodes.typeHint, list.typeHints)
    })
    list.items.forEach(item => {
        addToList(item.accessor, list.accessors)
        addToList(item.attributes, list.attributes)
        addToList(item.typeHint, list.typeHints)
    })
    list.attributes.forEach(attributes => {
        Object.values(attributes.entries).forEach(attribute => {
            addToList(attribute.accessor, list.accessors)
            addToList(attribute.typeHint, list.typeHints)
        })
    })
    list.accessors.forEach(accessor => addToList(accessor.bufferView, list.bufferViews))
    list.bufferViews.forEach(bufferView => addToList(bufferView.buffer, list.bufferViews))

    return list
}
