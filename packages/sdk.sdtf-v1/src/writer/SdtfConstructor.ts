import { ISdtfIntegration, ISdtfWriteableAsset, ISdtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-core"
import { ISdtfBinarySdtf } from "../binary_sdtf/ISdtfBinarySdtf"
import { SdtfBinarySdtf } from "../binary_sdtf/SdtfBinarySdtf"
import { ISdtfComponentFactoryWrapper } from "../structure/ISdtfComponentFactoryWrapper"
import { SdtfComponentFactoryWrapper } from "../structure/SdtfComponentFactoryWrapper"
import { ISdtfConstructor } from "./ISdtfConstructor"
import { ISdtfWriteableComponentPostProcessor } from "./ISdtfWriteableComponentPostProcessor"
import { ISdtfWriter } from "./ISdtfWriter"
import { SdtfWriteableComponentFactory } from "./SdtfWriteableComponentFactory"
import { SdtfWriteableComponentPostProcessor } from "./SdtfWriteableComponentPostProcessor"
import { SdtfWriter } from "./SdtfWriter"

export class SdtfConstructor implements ISdtfConstructor {

    private readonly binarySdtf: ISdtfBinarySdtf
    private readonly factory: ISdtfComponentFactoryWrapper
    private readonly postProcessor: ISdtfWriteableComponentPostProcessor

    constructor (integration: ISdtfIntegration[]) {
        this.binarySdtf = new SdtfBinarySdtf()
        this.factory = new SdtfComponentFactoryWrapper()
        this.postProcessor = new SdtfWriteableComponentPostProcessor(integration)
    }

    createBinarySdtf (asset: ISdtfWriteableAsset): ArrayBuffer {
        const writeableList = this.postProcessor.optimize(asset)
        const componentList = this.factory.createFromWriteable(writeableList)
        return this.binarySdtf.constructBinarySdtf(componentList)
    }

    getFactory (): ISdtfWriteableComponentFactory {
        return new SdtfWriteableComponentFactory()
    }

    getWriter (): ISdtfWriter {
        return new SdtfWriter(this.getFactory())
    }

}
