import { ISdDtfAttribute } from "@shapediver/sdk.sdtf-core"
import { ISdDtfAccessor } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAccessor"
import { ISdDtfAttributes } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAttributes"
import { ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfTypeHint"

export class SdDtfAttributes implements ISdDtfAttributes {

    [name: string]: ISdDtfAttribute

}

export class SdDtfAttribute implements ISdDtfAttribute {

    accessor?: ISdDtfAccessor
    typeHint?: ISdDtfTypeHint
    value?: unknown

}
