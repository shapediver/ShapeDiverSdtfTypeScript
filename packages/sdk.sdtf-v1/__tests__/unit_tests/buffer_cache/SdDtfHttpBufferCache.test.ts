import { SdDtfHttpBufferCache } from "../../../src/buffer_cache/SdDtfHttpBufferCache"
import { SdDtfHttpClient } from "../../../src/http/SdDtfHttpClient"

describe("acquireBuffer", function () {

    let origGetBinaryBuffer: any, origCalcCacheId: any

    let cache: SdDtfHttpBufferCache

    const cacheId = "foobar",
        partialBuffer = new DataView(new Uint8Array(5).buffer),
        entireBuffer = new Uint8Array(10).buffer

    beforeAll(() => {
        origGetBinaryBuffer = SdDtfHttpClient.prototype.getBinaryBuffer

        origCalcCacheId = SdDtfHttpBufferCache.prototype.calcCacheId
        SdDtfHttpBufferCache.prototype.calcCacheId = jest.fn(() => cacheId)
    })

    afterAll(() => {
        SdDtfHttpClient.prototype.getBinaryBuffer = origGetBinaryBuffer
        SdDtfHttpBufferCache.prototype.calcCacheId = origCalcCacheId
    })

    beforeEach(() => {
        cache = new SdDtfHttpBufferCache(new SdDtfHttpClient(""))
    })

    test("only partial buffer fetched; should cache partial buffer", async () => {
        // Mock
        SdDtfHttpClient.prototype.getBinaryBuffer = jest.fn(async () => Promise.resolve([ partialBuffer, undefined ]))

        expect(await cache.acquireBuffer("", 0, 1)).toBe(partialBuffer)
        expect(Object.keys(Object.values(cache.cache)[0]).length).toBe(1)
        expect(Object.values(cache.cache)[0][cacheId]).toBe(partialBuffer)
    })

    test("entire buffer fetched; should cache entire buffer", async () => {
        // Mock
        SdDtfHttpClient.prototype.getBinaryBuffer = jest.fn(async () => Promise.resolve([ partialBuffer, entireBuffer ]))

        expect(await cache.acquireBuffer("", 0, 1)).toBe(partialBuffer)
        expect(Object.keys(Object.values(cache.cache)[0]).length).toBe(1)
        expect(Object.values(cache.cache)[0][cache.cacheIdFullBuffer]).toStrictEqual(new DataView(entireBuffer))
    })

})
