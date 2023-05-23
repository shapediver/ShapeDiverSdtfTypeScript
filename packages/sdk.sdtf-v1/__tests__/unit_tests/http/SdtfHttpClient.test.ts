import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { SdtfBinarySdtf } from "../../../src/binary_sdtf/SdtfBinarySdtf"
import { SdtfHttpClient } from "../../../src/http/SdtfHttpClient"

describe("calcUrl", function() {

    test("should replace last part of json content url with uri", () => {
        const client = new SdtfHttpClient("https://shapediver.com/api/v2/sdtf/foo.sdtf")
        expect(client.calcUrl("bar/baz.obj")).toBe("https://shapediver.com/api/v2/sdtf/bar/baz.obj")
    })

})

describe("getJsonContent", function() {

    let origFetch: any, origReadHeader: any, origParseBinarySdtf: any

    const client = new SdtfHttpClient(""),
        headerBuffer = new ArrayBuffer(20),
        jsonContentBuffer = new ArrayBuffer(30),
        binaryBuffer = new DataView(new ArrayBuffer(40))

    beforeAll(() => {
        origFetch = SdtfHttpClient.prototype.fetch

        origReadHeader = SdtfBinarySdtf.prototype.readHeader
        SdtfBinarySdtf.prototype.readHeader = jest.fn(() => [20, 10])

        origParseBinarySdtf = SdtfBinarySdtf.prototype.parseBinarySdtf
        SdtfBinarySdtf.prototype.parseBinarySdtf = jest.fn(() => [
            new DataView(jsonContentBuffer),
            binaryBuffer,
        ])
    })

    afterAll(() => {
        SdtfHttpClient.prototype.fetch = origFetch
        SdtfBinarySdtf.prototype.readHeader = origReadHeader
        SdtfBinarySdtf.prototype.parseBinarySdtf = origParseBinarySdtf
    })

    test("partial requests supported; should return only partial buffer", async () => {
        // Mock
        let fetchCounter = 0
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            fetchCounter++
            if (fetchCounter === 1) return { data: headerBuffer, partial: true }
            if (fetchCounter === 2) return { data: jsonContentBuffer, partial: true }
            throw new Error("tryFetchPartially was called too often!")
        })

        expect(await client.getJsonContent()).toStrictEqual([
            new DataView(jsonContentBuffer),
            undefined,
        ])
    })

    test("partial requests not supported; should return entire buffer as well", async () => {
        // Mock
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            return { data: new ArrayBuffer(90), partial: false }
        })

        expect(await client.getJsonContent()).toStrictEqual([
            new DataView(jsonContentBuffer),
            binaryBuffer,
        ])
    })

})

describe("getBinaryBuffer", function() {

    let origFetch: any

    const client = new SdtfHttpClient(""),
        partialBuffer = new ArrayBuffer(30),
        entireBuffer = new ArrayBuffer(50)

    beforeAll(() => {
        origFetch = SdtfHttpClient.prototype.fetch
    })

    afterAll(() => {
        SdtfHttpClient.prototype.fetch = origFetch
    })

    test("partial requests supported; should return only partial buffer", async () => {
        // Mock
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            return { data: partialBuffer, partial: true }
        })

        expect(await client.getBinaryBuffer("", 0, 30)).toStrictEqual([
            new DataView(partialBuffer),
            undefined,
        ])
    })

    test("partial requests not supported; should return entire buffer as well", async () => {
        // Mock
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            return { data: entireBuffer, partial: false }
        })

        expect(await client.getBinaryBuffer("", 0, 30)).toStrictEqual([
            new DataView(entireBuffer, 0, 30),
            entireBuffer,
        ])
    })

})

describe("fetch", function() {

    const axiosMock = new MockAdapter(axios)

    let origFetchPartially: any, origFetchFully: any
    let spyFetchPartially: boolean, spyFetchFully: boolean

    const partialBuffer = new ArrayBuffer(25),
        fullBuffer = new ArrayBuffer(50)

    const client = new SdtfHttpClient("")

    beforeAll(() => {
        origFetchPartially = SdtfHttpClient.prototype.fetchPartially
        SdtfHttpClient.prototype.fetchPartially = jest.fn(async () => {
            spyFetchPartially = true
            return partialBuffer
        })

        origFetchFully = SdtfHttpClient.prototype.fetchFully
        SdtfHttpClient.prototype.fetchFully = jest.fn(async () => {
            spyFetchFully = true
            return fullBuffer
        })
    })

    afterAll(() => {
        SdtfHttpClient.prototype.fetchPartially = origFetchPartially
        SdtfHttpClient.prototype.fetchFully = origFetchFully

        axiosMock.restore() // remove mocking from axios
    })

    beforeEach(() => {
        spyFetchPartially = false
        spyFetchFully = false

        axiosMock.reset()   // remove all mock-handlers
    })

    test("status code not in 200 range; should throw", async () => {
        axiosMock.onHead().reply(400)

        await expect(client.fetch("", 10, 25))
            .rejects
            .toThrow()
    })

    test("content not encoded, range supported; fetch partially", async () => {
        axiosMock.onHead().reply(200, undefined, {
            "accept-ranges": "bytes",
            "access-control-allow-methods": "HEAD, GET",
            "access-control-allow-origin": "*",
            "age": 77486,
            "content-length": 59804,
            "content-type": "model/vnd.sdtf",
            "date": "Tue, 11 Apr 2023 10:32:1u GMT",
            "etag": "0afb7dc559527f3ea30f5da16fde4173",
            "last-modified": "Thu, 09 Mar 2023 17:14:23 GMT",
            "server": "AmazonS3",
            "via": "1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)",
            "x-amz-cf-id": "uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==",
            "x-amz-cf-pop": "VIE50-P1",
            "x-amz-server-side-encryption": "AES256",
            "x-amz-storage-class": "REDUCED_REDUNDANCY",
            "x-cache": "Hit from cloudfront",
        })

        const { data, partial } = await client.fetch("", 10, 25)

        expect(spyFetchPartially).toBeTruthy()
        expect(spyFetchFully).toBeFalsy()

        expect(data).toStrictEqual(partialBuffer)
        expect(partial).toBeTruthy()
    })

    test("content not encoded, range not supported; fetch fully", async () => {
        axiosMock.onHead().reply(200, undefined, {
            "accept-ranges": "none",
            "access-control-allow-methods": "HEAD, GET",
            "access-control-allow-origin": "*",
            "age": 77486,
            "content-length": 59804,
            "content-type": "model/vnd.sdtf",
            "date": "Tue, 11 Apr 2023 10:32:1u GMT",
            "etag": "0afb7dc559527f3ea30f5da16fde4173",
            "last-modified": "Thu, 09 Mar 2023 17:14:23 GMT",
            "server": "AmazonS3",
            "via": "1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)",
            "x-amz-cf-id": "uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==",
            "x-amz-cf-pop": "VIE50-P1",
            "x-amz-server-side-encryption": "AES256",
            "x-amz-storage-class": "REDUCED_REDUNDANCY",
            "x-cache": "Hit from cloudfront",
        })

        const { data, partial } = await client.fetch("", 10, 25)

        expect(spyFetchPartially).toBeFalsy()
        expect(spyFetchFully).toBeTruthy()

        expect(data).toStrictEqual(fullBuffer)
        expect(partial).toBeFalsy()
    })

    test("content encoded, range supported; fetch fully", async () => {
        axiosMock.onHead().reply(200, undefined, {
            "accept-ranges": "bytes",
            "access-control-allow-methods": "HEAD, GET",
            "access-control-allow-origin": "*",
            "age": 77486,
            "content-encoding": "gzip",
            "content-length": 59804,
            "content-type": "model/vnd.sdtf",
            "date": "Tue, 11 Apr 2023 10:32:1u GMT",
            "etag": "0afb7dc559527f3ea30f5da16fde4173",
            "last-modified": "Thu, 09 Mar 2023 17:14:23 GMT",
            "server": "AmazonS3",
            "via": "1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)",
            "x-amz-cf-id": "uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==",
            "x-amz-cf-pop": "VIE50-P1",
            "x-amz-server-side-encryption": "AES256",
            "x-amz-storage-class": "REDUCED_REDUNDANCY",
            "x-cache": "Hit from cloudfront",
        })

        const { data, partial } = await client.fetch("", 10, 25)

        expect(spyFetchPartially).toBeFalsy()
        expect(spyFetchFully).toBeTruthy()

        expect(data).toStrictEqual(fullBuffer)
        expect(partial).toBeFalsy()
    })

    test("content encoded, range not supported; fetch fully", async () => {
        axiosMock.onHead().reply(200, undefined, {
            "accept-ranges": "none",
            "access-control-allow-methods": "HEAD, GET",
            "access-control-allow-origin": "*",
            "age": 77486,
            "content-encoding": "gzip",
            "content-length": 59804,
            "content-type": "model/vnd.sdtf",
            "date": "Tue, 11 Apr 2023 10:32:1u GMT",
            "etag": "0afb7dc559527f3ea30f5da16fde4173",
            "last-modified": "Thu, 09 Mar 2023 17:14:23 GMT",
            "server": "AmazonS3",
            "via": "1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)",
            "x-amz-cf-id": "uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==",
            "x-amz-cf-pop": "VIE50-P1",
            "x-amz-server-side-encryption": "AES256",
            "x-amz-storage-class": "REDUCED_REDUNDANCY",
            "x-cache": "Hit from cloudfront",
        })

        const { data, partial } = await client.fetch("", 10, 25)

        expect(spyFetchPartially).toBeFalsy()
        expect(spyFetchFully).toBeTruthy()

        expect(data).toStrictEqual(fullBuffer)
        expect(partial).toBeFalsy()
    })

})
