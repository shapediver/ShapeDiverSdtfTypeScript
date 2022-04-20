import { ISdDtfIntegration, ISdDtfReadableAsset, ISdDtfWriteableAsset } from "@shapediver/sdk.sdtf-core"
import { readableComponentListFromAsset } from "../reader/ISdDtfReadableComponentList"
import { ISdDtfComponentFactoryWrapper } from "../structure/ISdDtfComponentFactoryWrapper"
import { ISdDtfComponentList, toJsonContent } from "../structure/ISdDtfComponentList"
import { SdDtfComponentFactoryWrapper } from "../structure/SdDtfComponentFactoryWrapper"
import { ISdDtfWriteableComponentPostProcessor } from "../writer/ISdDtfWriteableComponentPostProcessor"
import { SdDtfWriteableComponentPostProcessor } from "../writer/SdDtfWriteableComponentPostProcessor"
import { ISdDtfFormatter } from "./ISdDtfFormatter"

export class SdDtfFormatter implements ISdDtfFormatter {

    private readonly factory: ISdDtfComponentFactoryWrapper
    private readonly postProcessor: ISdDtfWriteableComponentPostProcessor

    constructor (integrations: ISdDtfIntegration[]) {
        this.factory = new SdDtfComponentFactoryWrapper()
        this.postProcessor = new SdDtfWriteableComponentPostProcessor(integrations)
    }

    prettifyReadableAsset (asset: ISdDtfReadableAsset): string {
        const readableList = readableComponentListFromAsset(asset)
        const componentList = this.factory.createFromReadable(readableList)
        return this.prettifyAsset(componentList)
    }

    prettifyWriteableAsset (asset: ISdDtfWriteableAsset): string {
        const writeableList = this.postProcessor.optimize(asset)
        const componentList = this.factory.createFromWriteable(writeableList)
        return this.prettifyAsset(componentList)
    }

    /**
     * Printify domain model.
     * @private
     */
    prettifyAsset (componentList: ISdDtfComponentList): string {
        const json = toJsonContent(componentList)
        return JSON.stringify(json, undefined, 2)
    }

}
