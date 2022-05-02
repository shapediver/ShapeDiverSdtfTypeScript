import {
    ISdtfIntegration,
    ISdtfTypeReader,
    ISdtfTypeWriter,
    ISdtfWriteableComponentFactory,
} from "@shapediver/sdk.sdtf-core"
import { SdtfCustomTypeReader } from "./SdtfCustomTypeReader"
import { SdtfCustomTypeWriter } from "./SdtfCustomTypeWriter"

/*
 * This is the entrance point of your integration.
 * The user instantiates this class and passes it to the SDK when it is created.
 */
export class SdtfCustomTypeIntegration implements ISdtfIntegration {

    isTypeHintSupported (typeHintName: string): boolean {
        /*
         * Check if the given typeHintName contains a type that is supported by this integration.
         *
         * When `true` is returned, the SDK will apply the reader of this integration (`SdtfCustomTypeReader`) when
         * parsing the value of a sdTF item or attribute, and the writer of this integration (`SdtfCustomTypeWriter`)
         * when a new sdTF file is created.
         *
         * When `false` is returned, none of this integration's functionality is applied to this type.
         *
         * Note:
         * The SDK checks every registered integration (in registration order) and applies the first integration that
         * supports the respective type.
         */
        throw new Error("Method not implemented.")
    }

    async init (): Promise<void> {
        /*
         * If your integration requires some kind of initialization then do it here :)
         *
         * This function is calls when a new `SdtfSdk` object is created.
         */
    }

    getReader (): ISdtfTypeReader {
        /*
         * Exposes your reader class to the SDK.
         */
        return new SdtfCustomTypeReader()
    }

    getWriter (factory: ISdtfWriteableComponentFactory): ISdtfTypeWriter {
        /*
         * Exposes your writer class to the SDK.
         *
         * The given factory enables your integration to instantiate new sdTF components if needed.
         */
        return new SdtfCustomTypeWriter(factory)
    }

}
