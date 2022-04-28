import { ISdtfIntegration, ISdtfReadableAsset, ISdtfWriteableAsset } from "@shapediver/sdk.sdtf-core"
import { readableComponentListFromAsset } from "../reader/ISdtfReadableComponentList"
import { ISdtfComponentFactoryWrapper } from "../structure/ISdtfComponentFactoryWrapper"
import { ISdtfComponentList, toJsonContent } from "../structure/ISdtfComponentList"
import { SdtfComponentFactoryWrapper } from "../structure/SdtfComponentFactoryWrapper"
import { ISdtfWriteableComponentPostProcessor } from "../writer/ISdtfWriteableComponentPostProcessor"
import { SdtfWriteableComponentPostProcessor } from "../writer/SdtfWriteableComponentPostProcessor"
import { ISdtfFormatter } from "./ISdtfFormatter"

export class SdtfFormatter implements ISdtfFormatter {

    private readonly factory: ISdtfComponentFactoryWrapper
    private readonly postProcessor: ISdtfWriteableComponentPostProcessor

    constructor (integrations: ISdtfIntegration[]) {
        this.factory = new SdtfComponentFactoryWrapper()
        this.postProcessor = new SdtfWriteableComponentPostProcessor(integrations)
    }

    prettifyReadableAsset (asset: ISdtfReadableAsset): string {
        const readableList = readableComponentListFromAsset(asset)
        const componentList = this.factory.createFromReadable(readableList)
        return this.prettifyAsset(componentList)
    }

    prettifyWriteableAsset (asset: ISdtfWriteableAsset): string {
        const writeableList = this.postProcessor.optimize(asset)
        const componentList = this.factory.createFromWriteable(writeableList)
        return this.prettifyAsset(componentList)
    }

    /**
     * Printify domain model.
     * @private
     */
    prettifyAsset (componentList: ISdtfComponentList): string {
        const json = toJsonContent(componentList)
        return JSON.stringify(json, undefined, 2)
    }

}
