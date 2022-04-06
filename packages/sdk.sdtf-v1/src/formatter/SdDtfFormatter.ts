import { ISdDtfReadableAsset, ISdDtfWriteableAsset } from "@shapediver/sdk.sdtf-core"
import { ISdDtfComponentFactoryWrapper } from "../structure/ISdDtfComponentFactoryWrapper"
import { ISdDtfComponentList, toJsonContent } from "../structure/ISdDtfComponentList"
import { SdDtfComponentFactoryWrapper } from "../structure/SdDtfComponentFactoryWrapper"
import { writeableComponentListFromAsset } from "../writer/ISdDtfWriteableComponentList"
import { ISdDtfWriteableComponentOptimizer } from "../writer/ISdDtfWriteableComponentOptimizer"
import { SdDtfWriteableComponentOptimizer } from "../writer/SdDtfWriteableComponentOptimizer"
import { ISdDtfFormatter } from "./ISdDtfFormatter"

export class SdDtfFormatter implements ISdDtfFormatter {

    private readonly factory: ISdDtfComponentFactoryWrapper
    private readonly optimizer: ISdDtfWriteableComponentOptimizer

    constructor () {
        this.factory = new SdDtfComponentFactoryWrapper()
        this.optimizer = new SdDtfWriteableComponentOptimizer()
    }

    prettifyReadableAsset (asset: ISdDtfReadableAsset): string {
        const componentList = this.factory.createFromReadable(asset)
        return this.prettifyAsset(componentList)
    }

    prettifyWriteableAsset (asset: ISdDtfWriteableAsset): string {
        const writeableList = writeableComponentListFromAsset(asset)
        this.optimizer.optimize(writeableList)

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
