import {
    ISdtfWriteableAccessor,
    ISdtfWriteableAsset,
    ISdtfWriteableAttributes,
    ISdtfWriteableBuffer,
    ISdtfWriteableBufferView,
    ISdtfWriteableChunk,
    ISdtfWriteableDataItem,
    ISdtfWriteableFileInfo,
    ISdtfWriteableNode,
    ISdtfWriteableTypeHint,
} from '@shapediver/sdk.sdtf-core';

export interface ISdtfWriteableComponentList {
    accessors: ISdtfWriteableAccessor[];

    asset: ISdtfWriteableAsset;

    attributes: ISdtfWriteableAttributes[];

    buffers: ISdtfWriteableBuffer[];

    bufferViews: ISdtfWriteableBufferView[];

    chunks: ISdtfWriteableChunk[];

    items: ISdtfWriteableDataItem[];

    nodes: ISdtfWriteableNode[];

    typeHints: ISdtfWriteableTypeHint[];

    fileInfo: ISdtfWriteableFileInfo;
}

/** Extracts all referenced components from the writeable asset object and returns them as a component list. */
export function writeableComponentListFromAsset(
    asset: ISdtfWriteableAsset
): ISdtfWriteableComponentList {
    // Helper function to add components to list if they are not already in the list
    const addToList = (
        component: { componentId: string } | undefined,
        array: { componentId: string }[]
    ): void => {
        if (!component) return;
        if (array.findIndex((c) => c.componentId === component.componentId) === -1)
            array.push(component);
    };

    const list: ISdtfWriteableComponentList = {
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
    };

    // NOTE: Extraction order matters!
    list.chunks.forEach((chunk) => {
        addToList(chunk.attributes, list.attributes);
        chunk.items.forEach((item) => addToList(item, list.items));
        chunk.nodes.forEach((node) => addToList(node, list.nodes));
        addToList(chunk.typeHint, list.typeHints);
    });
    list.nodes.forEach((nodes) => {
        addToList(nodes.attributes, list.attributes);
        nodes.items.forEach((item) => addToList(item, list.items));
        nodes.nodes.forEach((node) => addToList(node, list.nodes));
        addToList(nodes.typeHint, list.typeHints);
    });
    list.items.forEach((item) => {
        addToList(item.accessor, list.accessors);
        addToList(item.attributes, list.attributes);
        addToList(item.typeHint, list.typeHints);
    });
    list.attributes.forEach((attributes) => {
        Object.values(attributes.entries).forEach((attribute) => {
            addToList(attribute.accessor, list.accessors);
            addToList(attribute.typeHint, list.typeHints);
        });
    });
    list.accessors.forEach((accessor) => addToList(accessor.bufferView, list.bufferViews));
    list.bufferViews.forEach((bufferView) => addToList(bufferView.buffer, list.buffers));

    return list;
}
