//<editor-fold desc="Primitives">

/** Checks whether the given argument is a finite number or string number. */
export function isNumeric (arg: unknown): arg is number | string {
    if (typeof arg === "number") {
        return arg - arg === 0
    }
    if (typeof arg === "string" && arg.trim() !== "") {
        return (Number.isFinite) ? Number.isFinite(+arg) : isFinite(+arg)
    }
    return false
}

/** Checks whether the given argument is a finite number. */
export function isNumber (arg: unknown): arg is number {
    return isNumeric(arg) && typeof arg === "number"
}

/** Checks whether the given argument is a finite signed integer. */
export function isInt (arg: unknown): arg is number {
    return isNumber(arg) && Number.isInteger(Number(arg))
}

/** Checks whether the given argument is a finite unsigned integer. */
export function isUint (arg: unknown): arg is number {
    return isInt(arg) && Number(arg) >= 0
}

/** Checks whether the given argument is a string of length larger than 0. */
export function isNonEmptyString (arg: unknown): arg is string {
    return typeof arg === "string" && arg !== ""
}

//</editor-fold>


//<editor-fold desc="Arrays">

/** Checks whether the given argument is an array of numbers. */
export function isNumberArray (arg: unknown): arg is number[] {
    return Array.isArray(arg) && arg.every(a => isNumber(a))
}

/** Checks whether the given argument is an array of unsigned integers. */
export function isUintArray (arg: unknown): arg is (number | string)[] {
    return Array.isArray(arg) && arg.every(a => isUint(a))
}

//</editor-fold>


//<editor-fold desc="Objects">

/** Checks whether the given argument is an object - excluding `null` and `array`. */
export function isDataObject (arg: unknown): arg is Record<string, unknown> {
    return typeof arg === "object" &&
        !Array.isArray(arg) &&
        arg !== null &&
        !isBinaryData(arg)
}

export function isBinaryData (arg: unknown): arg is unknown {
    return arg instanceof ArrayBuffer ||    // Catches `ArrayBuffer`
        ArrayBuffer.isView(arg)             // Catches `DataView`, `Uint8Array`, etc.
}

//</editor-fold>


//<editor-fold desc="Misc">

/** Checks whether the given argument is `null` or `undefined`. */
export function isNil (arg: any): arg is null | undefined {
    return arg === undefined || arg === null
}

//</editor-fold>
