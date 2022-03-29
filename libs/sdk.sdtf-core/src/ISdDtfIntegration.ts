import { ISdDtfReader } from "./reader/ISdDtfReader"

export interface ISdDtfIntegration {

    /** Returns a reader instance for parsing and validating data values. */
    getReader (): ISdDtfReader

}
