import { ISdtfReadableComponentList } from '../reader/ISdtfReadableComponentList';
import { ISdtfWriteableComponentList } from '../writer/ISdtfWriteableComponentList';
import { ISdtfComponentList } from './ISdtfComponentList';

/** Wrapper around the component factory that encapsulates creational processes from different sources. */
export interface ISdtfComponentFactoryWrapper {
    /** Create sdTF components from JSON data. */
    createFromJson(json: Record<string, unknown>): ISdtfComponentList;

    /** Create sdTF components from a readable asset representation. */
    createFromReadable(readableComponents: ISdtfReadableComponentList): ISdtfComponentList;

    /** Create sdTF components from a writable asset representation. */
    createFromWriteable(writeableComponents: ISdtfWriteableComponentList): ISdtfComponentList;
}
