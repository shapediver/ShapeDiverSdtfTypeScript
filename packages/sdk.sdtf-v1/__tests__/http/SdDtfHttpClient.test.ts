import { SdDtfBinarySdtf } from "../../src/binary_sdtf/SdDtfBinarySdtf"
import { SdDtfHttpClient } from "../../src/http/SdDtfHttpClient"

describe("calcUrl", function () {

    test("should replace last part of json content url with uri", () => {
        const client = new SdDtfHttpClient("https://shapediver.com/api/v2/sdtf/foo.sdtf")
        expect(client.calcUrl("bar/baz.obj")).toBe("https://shapediver.com/api/v2/sdtf/bar/baz.obj")
    })

})

describe("getJsonContent", function () {

    let origTryFetchPartially: any, origReadHeader: any, origParseBinarySdtf: any

    const client = new SdDtfHttpClient(""),
        headerBuffer = new ArrayBuffer(20),
        jsonContentBuffer = new ArrayBuffer(30),
        binaryBuffer = new DataView(new ArrayBuffer(40))

    beforeAll(() => {
        origTryFetchPartially = SdDtfHttpClient.prototype.tryFetchPartially

        origReadHeader = SdDtfBinarySdtf.prototype.readHeader
        SdDtfBinarySdtf.prototype.readHeader = jest.fn(() => [ 20, 10 ])

        origParseBinarySdtf = SdDtfBinarySdtf.prototype.parseBinarySdtf
        SdDtfBinarySdtf.prototype.parseBinarySdtf = jest.fn(() => [ new DataView(jsonContentBuffer), binaryBuffer ])
    })

    afterAll(() => {
        SdDtfHttpClient.prototype.tryFetchPartially = origTryFetchPartially
        SdDtfBinarySdtf.prototype.readHeader = origReadHeader
        SdDtfBinarySdtf.prototype.parseBinarySdtf = origParseBinarySdtf
    })

    test("partial requests supported; should return only partial buffer", async () => {
        // Mock
        let fetchCounter = 0
        SdDtfHttpClient.prototype.tryFetchPartially = jest.fn(async () => {
            fetchCounter++
            if (fetchCounter === 1) return { data: headerBuffer, partial: true }
            if (fetchCounter === 2) return { data: jsonContentBuffer, partial: true }
            throw new Error("tryFetchPartially was called too often!")
        })

        expect(await client.getJsonContent()).toStrictEqual([ new DataView(jsonContentBuffer), undefined ])
    })

    test("partial requests not supported; should return entire buffer as well", async () => {
        // Mock
        SdDtfHttpClient.prototype.tryFetchPartially = jest.fn(async () => {
            return { data: new ArrayBuffer(90), partial: false }
        })

        expect(await client.getJsonContent()).toStrictEqual([ new DataView(jsonContentBuffer), binaryBuffer ])
    })

})

describe("getBinaryBuffer", function () {

    let origTryFetchPartially: any

    const client = new SdDtfHttpClient(""),
        partialBuffer = new ArrayBuffer(30),
        entireBuffer = new ArrayBuffer(50)

    beforeAll(() => {
        origTryFetchPartially = SdDtfHttpClient.prototype.tryFetchPartially
    })

    afterAll(() => {
        SdDtfHttpClient.prototype.tryFetchPartially = origTryFetchPartially
    })

    test("partial requests supported; should return only partial buffer", async () => {
        // Mock
        SdDtfHttpClient.prototype.tryFetchPartially = jest.fn(async () => {
            return { data: partialBuffer, partial: true }
        })

        expect(await client.getBinaryBuffer("", 0, 30)).toStrictEqual([ new DataView(partialBuffer), undefined ])
    })

    test("partial requests not supported; should return entire buffer as well", async () => {
        // Mock
        SdDtfHttpClient.prototype.tryFetchPartially = jest.fn(async () => {
            return { data: entireBuffer, partial: false }
        })

        expect(await client.getBinaryBuffer("", 0, 30)).toStrictEqual([ new DataView(entireBuffer, 0, 30), entireBuffer ])
    })

})
