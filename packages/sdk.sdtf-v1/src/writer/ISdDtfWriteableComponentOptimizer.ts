import { ISdDtfWriteableComponentList } from "./ISdDtfWriteableComponentList"

/**
 * Post-processor for a writable component list.
 *
 * The structure and handling of writeable components has been simplified to improve usability.
 * However, these differences must be addressed before a writeable asset can be mapped to our domain model.
 * This is done the optimizer.
 */
export interface ISdDtfWriteableComponentOptimizer {

    /**
     * Removes duplicated type hints and merges buffer data.
     * @param componentList
     */
    optimize (componentList: ISdDtfWriteableComponentList): void

}
