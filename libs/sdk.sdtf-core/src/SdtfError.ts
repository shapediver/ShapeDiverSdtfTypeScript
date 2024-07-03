export const SdtfErrorType = {
    Generic: 'sd_sdtf_generic',
} as const;
export type SdtfErrorType = (typeof SdtfErrorType)[keyof typeof SdtfErrorType];

export class SdtfError extends Error {
    public readonly errorType: SdtfErrorType = SdtfErrorType.Generic;

    constructor(message: string) {
        super(message);
    }
}
