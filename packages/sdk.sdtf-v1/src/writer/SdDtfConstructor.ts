import { ISdDtfWriteableAsset } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBinarySdtf } from "../binary_sdtf/ISdDtfBinarySdtf"
import { SdDtfBinarySdtf } from "../binary_sdtf/SdDtfBinarySdtf"
import { ISdDtfComponentFactoryWrapper } from "../structure/ISdDtfComponentFactoryWrapper"
import { SdDtfComponentFactoryWrapper } from "../structure/SdDtfComponentFactoryWrapper"
import { ISdDtfConstructor } from "./ISdDtfConstructor"
import { ISdDtfWriteableComponentFactory } from "./ISdDtfWriteableComponentFactory"
import { writeableComponentListFromAsset } from "./ISdDtfWriteableComponentList"
import { ISdDtfWriteableComponentOptimizer } from "./ISdDtfWriteableComponentOptimizer"
import { ISdDtfWriter } from "./ISdDtfWriter"
import { SdDtfWriteableComponentFactory } from "./SdDtfWriteableComponentFactory"
import { SdDtfWriteableComponentOptimizer } from "./SdDtfWriteableComponentOptimizer"
import { SdDtfWriter } from "./SdDtfWriter"

export class SdDtfConstructor implements ISdDtfConstructor {

    private readonly binarySdtf: ISdDtfBinarySdtf
    private readonly factory: ISdDtfComponentFactoryWrapper
    private readonly optimizer: ISdDtfWriteableComponentOptimizer

    constructor () {
        this.binarySdtf = new SdDtfBinarySdtf()
        this.factory = new SdDtfComponentFactoryWrapper()
        this.optimizer = new SdDtfWriteableComponentOptimizer()
    }

    createBinarySdtf (asset: ISdDtfWriteableAsset): ArrayBuffer {
        const writeableList = writeableComponentListFromAsset(asset)
        this.optimizer.optimize(writeableList)

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
