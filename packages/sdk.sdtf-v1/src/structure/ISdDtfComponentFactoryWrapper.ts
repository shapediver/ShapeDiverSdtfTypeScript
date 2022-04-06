import { ISdDtfReadableAsset } from "@shapediver/sdk.sdtf-core"
import { ISdDtfComponentList } from "./ISdDtfComponentList"

/** Wrapper around the component factory that encapsulates creational processes from different sources. */
export interface ISdDtfComponentFactoryWrapper {

    /** Create sdTF components from JSON data. */
    createFromJson (json: Record<string, unknown>): ISdDtfComponentList

    /** Create sdTF components from a readable asset representation. */
    createFromReadable (readableAsset: ISdDtfReadableAsset): ISdDtfComponentList

}
