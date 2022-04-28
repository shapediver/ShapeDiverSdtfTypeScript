import {
    enumValues,
    ISdtfTypeWriter,
    ISdtfWriteableAttribute,
    ISdtfWriteableComponentFactory,
    ISdtfWriteableDataItem,
    sdAssertUnreachable,
    SdtfError,
    SdtfGrasshopperTypeHintName,
    SdtfRhinoTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import * as pako from "pako"
import { File3dm, File3dmObjectTable } from "rhino3dm"
import { SdtfRhino3dmSingleton } from "./SdtfRhino3dmSingleton"
import { SdtfRhino3dmTypeConfig } from "./SdtfRhino3dmTypeConfig"
import { CompressionTypes } from "./SdtfRhino3dmTypeIntegration"
import { SdtfRhino3dmTypeValidator } from "./SdtfRhino3dmTypeValidator"

export class SdtfRhino3dmTypeWriter implements ISdtfTypeWriter {

    private readonly validator = new SdtfRhino3dmTypeValidator(this.config)

    /** The content type to use when writing rhino components to sdTF. */
    readonly CONTENT_TYPE_RHINO3DM = "model/vnd.3dm"

    constructor (
        private config: SdtfRhino3dmTypeConfig,
        private factory: ISdtfWriteableComponentFactory,
    ) {
    }

    writeComponent (component: ISdtfWriteableAttribute | ISdtfWriteableDataItem): void {
        const typeHint = component.typeHint?.name as string

        // Make sure that the component consists of valid data.
        // We have to make sure that the rhino objects are valid - otherwise getContent() wont work on them!
        if (!this.validator.validateExternalRepresentationOfComponent(typeHint, component.value, component.accessor)) {
            throw new SdtfError(`Cannot write component of type '${ typeHint }': Specified component data is invalid (for rhino3dm objects make sure that '.isValid' is truthy).`)
        }

        // Only process grasshopper types here, rhino components are processed later
        switch (typeHint) {
            case SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH:
                delete component.accessor   // Stored in JSON content
                break
            default:
                return  // All other types are ignored
        }
    }

    postProcessComponents (components: (ISdtfWriteableAttribute | ISdtfWriteableDataItem)[]): void {
        const rhinoComponents = components.filter(c => enumValues(SdtfRhinoTypeHintName).includes(c.typeHint?.name ?? ""))

        // Stop if there are no rhino components
        if (rhinoComponents.length === 0) return

        // Create a new 3dm file, which is the main storage format in Rhino (stored using the OpenNURBS file standard)
        const rhino = SdtfRhino3dmSingleton.getInstance()
        const file: File3dm = new rhino.File3dm()
        const table = file.objects() as unknown as File3dmObjectTable

        // Add every rhino object to the file table, add an empty accessor to the component and store the object id
        rhinoComponents.forEach(component => {
            const typeHint = component.typeHint!.name as SdtfRhinoTypeHintName,
                attributes = new rhino.ObjectAttributes()
            let id: string = ""
            switch (typeHint) {
                case SdtfRhinoTypeHintName.RHINO_ARC_CURVE:
                    // @ts-ignore
                    id = table.addCurve(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_BREP:
                    // @ts-ignore
                    id = table.addBrep(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_CURVE:
                    // @ts-ignore
                    id = table.addCurve(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_EXTRUSION:
                    // @ts-ignore
                    id = table.addExtrusion(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_LINE_CURVE:
                    // @ts-ignore
                    id = table.addCurve(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_MESH:
                    // @ts-ignore
                    id = table.addMesh(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_NURBS_CURVE:
                    // @ts-ignore
                    id = table.addCurve(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_NURBS_SURFACE:
                    // @ts-ignore
                    id = table.add(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_PLANE_SURFACE:
                    // @ts-ignore
                    id = table.add(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_POINT:
                    // @ts-ignore
                    id = table.addPoint([ ...component.value.location ])
                    break
                case SdtfRhinoTypeHintName.RHINO_POLY_CURVE:
                    // @ts-ignore
                    id = table.addCurve(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE:
                    // @ts-ignore
                    id = table.addCurve(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_REV_SURFACE:
                    // @ts-ignore
                    id = table.add(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_SUBD:
                    // @ts-ignore
                    id = table.add(component.value, attributes)
                    break
                case SdtfRhinoTypeHintName.RHINO_SURFACE:
                    // @ts-ignore
                    id = table.add(component.value, attributes)
                    break
                default:
                    sdAssertUnreachable(typeHint)
            }
            component.accessor = this.factory.createAccessor()
            component.accessor.id = id

            delete component.value      // Stored in sdTF buffer
        })

        // Encode the whole rhino3dm-file
        const [encoded, compressionType ] = this.encode(file.toByteArray())

        // Store the encoded rhino3dm-file in the buffer
        const bufferView = this.factory.createBufferView({
            data: encoded,
            contentType: this.CONTENT_TYPE_RHINO3DM,
        })
        bufferView.contentEncoding = compressionType

        // Link the created buffer view in all components and validate
        rhinoComponents.forEach(component => {
            component.accessor!.bufferView = bufferView

            // Make sure that the component consists of valid data
            if (!this.validator.validateInternalRepresentationOfComponent(component.typeHint!.name!, component.value, component.accessor)) {
                throw new SdtfError(`Cannot write component of type '${ component.typeHint!.name }': Invalid component.`)
            }
        })
    }

    /**
     * When the integration is configured to compress the data before writing, the given data is compressed via GZIP and
     * returned together with the corresponding compression type.
     * @private
     */
    encode (data: ArrayBuffer): [ Uint8Array, string | undefined ] {
        if (this.config.enableCompression) {
            return [ pako.deflate(new Uint8Array(data)), CompressionTypes.GZIP ]
        } else {
            return [ new Uint8Array(data), undefined]
        }
    }

}
