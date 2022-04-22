import {
    ISdDtfReadableAccessor,
    ISdDtfReadableContentComponent,
    ISdDtfTypeReader,
    sdAssertUnreachable,
    SdDtfError,
    SdDtfGrasshopperTypeHintName,
    SdDtfRhinoTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import * as pako from "pako"
import { File3dm, File3dmObject } from "rhino3dm"
import { SdDtfRhino3dmSingleton } from "./SdDtfRhino3dmSingleton"
import { SdDtfRhino3dmTypeConfig } from "./SdDtfRhino3dmTypeConfig"
import { CompressionTypes } from "./SdDtfRhino3dmTypeIntegration"
import { SdDtfRhino3dmTypeValidator } from "./SdDtfRhino3dmTypeValidator"

export class SdDtfRhino3dmTypeReader implements ISdDtfTypeReader {

    private readonly validator = new SdDtfRhino3dmTypeValidator(this.config)

    constructor (private config: SdDtfRhino3dmTypeConfig) {
    }


    async readComponent (component: ISdDtfReadableContentComponent): Promise<unknown> {
        const typeHint = component.typeHint?.name as string

        // Make sure that the component consists of valid data
        if (!this.validator.validateInternalRepresentationOfComponent(typeHint, component.value, component.accessor)) {
            throw new SdDtfError(`Cannot read value of type '${ typeHint }': Invalid component.`)
        }

        if (typeHint === SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH) {
            return component.value  // Nothing to map here
        }

        // Map the component data and return the result
        const rhinoTypeHint = typeHint as SdDtfRhinoTypeHintName
        switch (rhinoTypeHint) {
            case SdDtfRhinoTypeHintName.RHINO_ARC_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_BREP:
            case SdDtfRhinoTypeHintName.RHINO_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_EXTRUSION:
            case SdDtfRhinoTypeHintName.RHINO_LINE_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_MESH:
            case SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_NURBS_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_POINT:
            case SdDtfRhinoTypeHintName.RHINO_POLY_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_POLYLINE_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_REV_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_SUBD:
            case SdDtfRhinoTypeHintName.RHINO_SURFACE:
                return this.instantiateRhinoComponent(component.accessor!)
            default:
                sdAssertUnreachable(rhinoTypeHint)
        }
    }

    /**
     * Rhino components are stored in the sdTF buffer as a 3dm file (based on the OpenNURBS file standard).
     * This function loads the data from the buffer and extracts the Rhino object by ID.
     * Additionally, the data is decoded priorly if necessary.
     * @private
     */
    async instantiateRhinoComponent (accessor: ISdDtfReadableAccessor): Promise<unknown> {
        const content = await accessor.getContent()

        const data = this.decodeContent(content.data, accessor.bufferView.contentEncoding)

        const rhino = SdDtfRhino3dmSingleton.getInstance()

        // @ts-ignore: Create object from byte array - returns null if not successful!
        const file3dm: File3dm = rhino.File3dm.fromByteArray(data)
        if (file3dm === null) throw new SdDtfError("Invalid Rhino component: Cannot instantiate rhino3dm object from buffer data.")

        // @ts-ignore: Extract the object by ID - returns null if not found!
        const object3dm: File3dmObject = file3dm.objects().findId(content.id)
        if (object3dm === null) throw new SdDtfError(`Invalid Rhino component: Could not find rhino3dm object with ID '${ content.id }'.`)

        return object3dm.geometry()
    }

    /**
     * Copies the binary data of the data view (deep copy!) and decodes its content if specified.
     * @private
     */
    decodeContent (dv: DataView, encoding?: string): ArrayBuffer {
        const buffer = new Uint8Array(dv.buffer.slice(dv.byteOffset, dv.byteOffset + dv.byteLength))

        switch (encoding) {
            case CompressionTypes.GZIP:
                return pako.inflate(buffer)
            default:
                return buffer
        }
    }

}
