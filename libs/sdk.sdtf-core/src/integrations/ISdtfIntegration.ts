import { ISdtfWriteableComponentFactory } from '../writer/ISdtfWriteableComponentFactory';
import { ISdtfTypeReader } from './ISdtfTypeReader';
import { ISdtfTypeWriter } from './ISdtfTypeWriter';

/** The integration binds reading, writing and validation logic to the supported type hints of the integration. */
export interface ISdtfIntegration {
    /** Returns `true` when the given type hint is supported by this integration; otherwise `false`. */
    isTypeHintSupported(typeHintName: string): boolean;

    /** This function is called when the sdTF SDK is instantiated. */
    init(): Promise<void>;

    /** Returns a reader instance for parsing and mapping data content. */
    getReader(): ISdtfTypeReader;

    /** Returns a writer instance for mapping data content. */
    getWriter(factory: ISdtfWriteableComponentFactory): ISdtfTypeWriter;
}
