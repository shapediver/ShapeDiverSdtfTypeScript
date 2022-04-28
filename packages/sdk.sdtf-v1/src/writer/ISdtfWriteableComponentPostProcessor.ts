import { ISdtfWriteableAsset } from "@shapediver/sdk.sdtf-core"
import { ISdtfWriteableComponentList } from "./ISdtfWriteableComponentList"

/**
 * Post-processor for a writable component list.
 *
 * The structure and handling of writeable components has been simplified to improve usability.
 * However, these differences must be addressed before a writeable asset can be mapped to our domain model.
 * This is done by the optimizer.
 */
export interface ISdtfWriteableComponentPostProcessor {

    /** Calls component-writers of registered integrations, removes duplicated type hints and merges buffer data. */
    optimize (asset: ISdtfWriteableAsset): ISdtfWriteableComponentList

}
