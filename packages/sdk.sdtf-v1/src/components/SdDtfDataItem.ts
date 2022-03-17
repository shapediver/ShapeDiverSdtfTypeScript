import { ISdDtfAccessor } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAccessor"
import { ISdDtfAttributes } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAttributes"
import { ISdDtfDataItem } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfDataItem"
import { ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfTypeHint"

export class SdDtfDataItem implements ISdDtfDataItem {

    accessor?: ISdDtfAccessor
    attributes?: ISdDtfAttributes
    typeHint?: ISdDtfTypeHint
    value?: unknown
    [custom: string]: unknown

}
