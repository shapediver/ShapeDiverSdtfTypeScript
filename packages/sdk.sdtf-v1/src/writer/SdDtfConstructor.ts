import { ISdDtfIntegration, ISdDtfWriteableAsset, ISdDtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBinarySdtf } from "../binary_sdtf/ISdDtfBinarySdtf"
import { SdDtfBinarySdtf } from "../binary_sdtf/SdDtfBinarySdtf"
import { ISdDtfComponentFactoryWrapper } from "../structure/ISdDtfComponentFactoryWrapper"
import { SdDtfComponentFactoryWrapper } from "../structure/SdDtfComponentFactoryWrapper"
import { ISdDtfConstructor } from "./ISdDtfConstructor"
import { ISdDtfWriteableComponentPostProcessor } from "./ISdDtfWriteableComponentPostProcessor"
import { ISdDtfWriter } from "./ISdDtfWriter"
import { SdDtfWriteableComponentFactory } from "./SdDtfWriteableComponentFactory"
import { SdDtfWriteableComponentPostProcessor } from "./SdDtfWriteableComponentPostProcessor"
import { SdDtfWriter } from "./SdDtfWriter"

export class SdDtfConstructor implements ISdDtfConstructor {

    private readonly binarySdtf: ISdDtfBinarySdtf
    private readonly factory: ISdDtfComponentFactoryWrapper
    private readonly postProcessor: ISdDtfWriteableComponentPostProcessor

    constructor (integration: ISdDtfIntegration[]) {
        this.binarySdtf = new SdDtfBinarySdtf()
        this.factory = new SdDtfComponentFactoryWrapper()
        this.postProcessor = new SdDtfWriteableComponentPostProcessor(integration)
    }

    createBinarySdtf (asset: ISdDtfWriteableAsset): ArrayBuffer {
        const writeableList = this.postProcessor.optimize(asset)
        const componentList = this.factory.createFromWriteable(writeableList)
        return this.binarySdtf.constructBinarySdtf(componentList)
    }

    getFactory (): ISdDtfWriteableComponentFactory {
        return new SdDtfWriteableComponentFactory()
    }

    getWriter (): ISdDtfWriter {
        return new SdDtfWriter(this.getFactory())
    }

}
