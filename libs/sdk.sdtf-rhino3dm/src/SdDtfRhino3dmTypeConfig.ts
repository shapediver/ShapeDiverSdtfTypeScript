/**
 * Config object for this integration.
 * The user is can override every setting when creating and adding the integration to the SDK.
 */
export class SdDtfRhino3dmTypeConfig {

    /**
     * When enabled, compresses the rhino3dm file via GZIP when creating a new sdTF asset.
     * This reduces the overall size of the sdTF buffer object.
     *
     * Default: `true`.
     */
    readonly enableCompression: boolean = true

    /**
     * When required, validates all rhino3dm components when creating a new sdTF asset and throws when one is invalid.
     *
     * The rhino3dm library neglects some rhino3dm objects on writing when they are invalid, which might lead to issues
     * when reading the sdTF file later on.
     * By checking the validity of these objects it can be ensured, that this issue will not occur.
     *
     * Default: `true`.
     */
    readonly requireValidRhino3dmComponents: boolean = true

    constructor (config?: Partial<SdDtfRhino3dmTypeConfig>) {
        if (config?.enableCompression !== undefined)
            this.enableCompression = config.enableCompression

        if (config?.requireValidRhino3dmComponents !== undefined)
            this.requireValidRhino3dmComponents = config.requireValidRhino3dmComponents
    }

}
