import { ISdtfBaseComponent } from './ISdtfBaseComponent';

/** Representation of a [sdTF buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferview). */
export interface ISdtfBufferView extends ISdtfBaseComponent {
    /** Holds the positional index of the referenced buffer object in the sdTF asset structure. */
    buffer: number;

    /** The length of the buffer view in bytes. */
    byteLength: number;

    /** The offset into the buffer in bytes. */
    byteOffset: number;

    /**
     * Content-Encoding which was used to compress the data referenced by the buffer view.
     *
     * See [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding).
     */
    contentEncoding?: string;

    /**
     * MIME type of data referenced by the buffer view.
     *
     * See [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml)
     * and [RFC 6838](https://tools.ietf.org/html/rfc6838).
     */
    contentType: string;

    /**
     * Optional name of the buffer view.
     * May be used to store a filename including file ending, which can help to disambiguate {@link contentType}.
     */
    name?: string;

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>;
}
