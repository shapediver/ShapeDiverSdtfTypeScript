import { ISdDtfParser } from "@shapediver/sdk.sdtf-core"
import { SdDtfParser } from "./reader/SdDtfParser"

/** Returns a new instance of the ShapeDiver sdTf SDK. */
export function create (): SdDtfSdk {
    return new SdDtfSdk()
}

export class SdDtfSdk {

    /**
     * Instantiates and returns a new sdTF parser object.
     * The parser reads sdTF data from various sources and returns an asset object, that represents the hierarchy of
     * the sdTF file and provides easy access functionality for embedded values and binary data.
     */
    createParser (): ISdDtfParser {
        return new SdDtfParser()
    }

}
