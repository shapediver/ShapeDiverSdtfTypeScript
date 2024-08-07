import { SdtfError } from '@shapediver/sdk.sdtf-core';
import { RhinoModule } from 'rhino3dm';

const rhino3dm = require('rhino3dm');

/**
 * Singleton wrapper around the rhino3dm.js library.
 * On creation, rhino3dm loads a WASM file, which can take a while.
 */
export class SdtfRhino3dmSingleton {
    private static rhino: RhinoModule | undefined;

    // 'private' to prevent direct construction
    private constructor() {}

    /**
     * The rhino3dm library is based on a WASM module that has to be loaded separately.
     * This function initializes rhino3dm so it can be used by all components of this integration.
     */
    static async init(): Promise<void> {
        // Check if already initialized
        if (SdtfRhino3dmSingleton.rhino) return;

        // SdtfRhino3dmSingleton.rhino = await rhino3dm()
        SdtfRhino3dmSingleton.rhino = await rhino3dm();
    }

    static getInstance(): RhinoModule {
        if (!SdtfRhino3dmSingleton.rhino)
            throw new SdtfError('The dependency rhino3dm.js has not been initialized.');

        return SdtfRhino3dmSingleton.rhino;
    }
}
