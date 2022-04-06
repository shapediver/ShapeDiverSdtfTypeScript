import { ISdDtfWriteableBuffer, ISdDtfWriteableBufferView, ISdDtfWriteableTypeHint } from "@shapediver/sdk.sdtf-core"
import { SdDtfWriteableBuffer } from "./components/SdDtfWriteableBuffer"
import { ISdDtfWriteableComponentList } from "./ISdDtfWriteableComponentList"
import { ISdDtfWriteableComponentOptimizer } from "./ISdDtfWriteableComponentOptimizer"

export class SdDtfWriteableComponentOptimizer implements ISdDtfWriteableComponentOptimizer {

    optimize (componentList: ISdDtfWriteableComponentList): void {
        this.removeDuplicatedTypeHints(componentList)
        this.resolveBuffers(componentList)
    }

    /**
     * Generates a list of unique type hints for all components in the list and resets the component references accordingly.
     * @private
     */
    removeDuplicatedTypeHints (componentList: ISdDtfWriteableComponentList): void {
        const uniqueTypeHints: ISdDtfWriteableTypeHint[] = []

        // Find all different type hint names
        componentList.typeHints.forEach(typeHint => {
            if (!uniqueTypeHints.find(this.areTypeHintsSimilar.bind(this, typeHint)))
                uniqueTypeHints.push(typeHint)
        })

        // Replace the type hint of all components with the unique ones
        const replaceTypeHints = (component: { typeHint?: ISdDtfWriteableTypeHint }): void => {
            // Stop if no type hint or type hint already in unique-list
            if (!component.typeHint ||
                uniqueTypeHints.find((typeHint) => typeHint.componentId === component.typeHint!.componentId))
                return

            // We know that there is a unique type hint for this component, so just search for it
            component.typeHint = uniqueTypeHints.find((typeHint) => this.areTypeHintsSimilar(typeHint, component.typeHint!))
        }

        componentList.attributes.forEach(a => Object.values(a.entries).forEach(e => replaceTypeHints(e)))
        componentList.chunks.forEach(c => replaceTypeHints(c))
        componentList.items.forEach(i => replaceTypeHints(i))
        componentList.nodes.forEach(n => replaceTypeHints(n))

        // Update type hints in component list
        componentList.typeHints = Object.values(uniqueTypeHints)
    }

    /**
     * Helper function to compare the two given type hints.
     * Returns true, if both type hints have the same `name` property and share the same `additionalProperties`.
     * However, the order of additional properties is not considered.
     * @private
     */
    areTypeHintsSimilar (t1: ISdDtfWriteableTypeHint, t2: ISdDtfWriteableTypeHint): boolean {
        const nAdditionalPropertiesT1 = Object.entries(t1.additionalProperties ?? {}),
            nAdditionalPropertiesT2 = Object.entries(t2.additionalProperties ?? {})

        if (t1.name !== t2.name || nAdditionalPropertiesT1.length !== nAdditionalPropertiesT2.length)
            return false

        for (let i = 0; i < nAdditionalPropertiesT1.length; i++) {
            const [ key, value ] = nAdditionalPropertiesT1[i]
            if (t2.additionalProperties[key] !== value)
                return false
        }

        return true
    }

    /**
     *
     * @private
     */
    resolveBuffers (componentList: ISdDtfWriteableComponentList): void {
        // List that sorts buffers/bufferViews by the buffer uri
        const bufferViewsPerUri: Record<string, ISdDtfWriteableBufferView[]> = {}

        // Add buffer view to list
        componentList.bufferViews.forEach(bufferView => {
            // We are not interested in buffer views that are not linked to a buffer
            if (!bufferView.buffer) return

            const uri = bufferView.buffer.uri ?? ""

            if (!bufferViewsPerUri[uri]) bufferViewsPerUri[uri] = []
            bufferViewsPerUri[uri].push(bufferView)
        })

        // We want to create a new buffer per uri that contains all buffer data of our list
        const mergedBuffers: ISdDtfWriteableBuffer[] = []
        Object.entries(bufferViewsPerUri).forEach(([ uri, bufferViews ]) => {
            const [ mergedBuffer, offsets ] = this.mergeBuffers(uri, bufferViews.map(bv => bv.buffer!))

            // Update buffer information in buffer view
            bufferViews.forEach((bufferView, i) => {
                bufferView.byteOffset = offsets[i]
                bufferView.byteLength = bufferView.buffer!.data!.byteLength ?? 0
                bufferView.buffer = mergedBuffer
            })
            mergedBuffers.push(mergedBuffer)
        })

        // Update buffers in component list
        componentList.buffers = mergedBuffers
    }

    /**
     * Creates a new writeable buffer that holds the data of all given buffers.
     * It returns the newly created buffer and a list of `byte offsets` corresponding to the given buffer.
     * This allows to track down the individual buffers in the merged one.
     * @private
     * @returns - [ merged buffer, byte offset for each buffer ]
     */
    mergeBuffers (uri: string, buffers: ISdDtfWriteableBuffer[]): [ ISdDtfWriteableBuffer, number[] ] {
        const merged = new SdDtfWriteableBuffer()
        merged.uri = uri
        // merged.additionalProperties = { ...buffers.map(b => b.additionalProperties ?? {}) } // Merge their additional properties
        merged.additionalProperties = {}

        // Merge additional properties
        Object.assign(merged.additionalProperties, ...buffers.map(b => b.additionalProperties))

        // Merge buffer data
        const [ mergedData, offsetsPerBuffer ] = this.mergeBufferData(buffers)
        merged.data = mergedData

        return [ merged, offsetsPerBuffer ]
    }

    /**
     * Creates a new writeable buffer that holds the data of all given buffers (hard copy!).
     * It returns the newly created buffer and each buffer's `byte offset`.
     * @private
     * @returns - [ merged buffer, byte offset for each buffer ]
     */
    mergeBufferData (buffers: ISdDtfWriteableBuffer[]): [ ArrayBuffer, number[] ] {
        /*
         * According to the sdTF v1 specification, when concatenating two buffers, the size of the first buffer must be
         * of a multiple of 4. This helper function rounds the given byte size up meet that criteria.
         */
        const roundToNextMultipleOfFour = (value: number): number => {
            const diff = value % 4
            return (diff === 0) ? value : value + 4 - diff
        }

        // The first buffer start at the beginning
        let offsets: number[] = [ 0 ],
            lastBufferLength = buffers[0].data?.byteLength ?? 0

        // Calculate the offsets of each buffer
        if (buffers.length > 0) {
            // All buffers, except for the last one, must have a size that is a multiple of four
            lastBufferLength = roundToNextMultipleOfFour(lastBufferLength)

            for (let i = 1; i < buffers.length; i++) {
                let bufferLength = 0

                const data = buffers[i].data
                if (data) {
                    // All buffers, except for the last one, must have a size that is a multiple of four
                    if (i === buffers.length - 1) bufferLength = data.byteLength
                    else bufferLength = roundToNextMultipleOfFour(data.byteLength)
                }

                offsets.push(offsets[i - 1] + lastBufferLength)
                lastBufferLength = bufferLength
            }
        }


        // Create a new buffer and add the data of all the given buffers, according to the calculated offsets
        const merged = new Uint8Array(offsets[offsets.length - 1] + lastBufferLength)

        // Add content data to new buffer
        buffers.forEach((buffer, i) => {
            const data = (buffer.data) ? new Uint8Array(buffer.data) : new Uint8Array(0)
            merged.set(data, offsets[i])
        })

        return [ merged, offsets ]
    }

}
