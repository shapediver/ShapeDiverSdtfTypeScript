/** Represents an RGBA color (red, green, blue, alpha) with values between `0` and `1`. */
export type SdtfPrimitiveColorType = [ number, number, number, number ]

/** Represents a JSON object with arbitrary data. */
export type SdtfPrimitiveJsonType = Record<string, unknown> | Array<unknown>
