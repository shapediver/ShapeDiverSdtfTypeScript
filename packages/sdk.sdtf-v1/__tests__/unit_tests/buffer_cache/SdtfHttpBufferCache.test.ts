import { SdtfHttpBufferCache } from "../../../src/buffer_cache/SdtfHttpBufferCache"
import { SdtfHttpClient } from "../../../src/http/SdtfHttpClient"

describe("acquireBuffer", function () {

    let origGetBinaryBuffer: any, origCalcCacheId: any

    let cache: SdtfHttpBufferCache

    const cacheId = "foobar",
        partialBuffer = new DataView(new Uint8Array(5).buffer),
        entireBuffer = new Uint8Array(10).buffer

    beforeAll(() => {
        origGetBinaryBuffer = SdtfHttpClient.prototype.getBinaryBuffer

        origCalcCacheId = SdtfHttpBufferCache.prototype.calcCacheId
        SdtfHttpBufferCache.prototype.calcCacheId = jest.fn(() => cacheId)
    })

    afterAll(() => {
        SdtfHttpClient.prototype.getBinaryBuffer = origGetBinaryBuffer
        SdtfHttpBufferCache.prototype.calcCacheId = origCalcCacheId
    })

    beforeEach(() => {
        cache = new SdtfHttpBufferCache(new SdtfHttpClient(""))
    })

    test("only partial buffer fetched; should cache partial buffer", async () => {
        // Mock
        SdtfHttpClient.prototype.getBinaryBuffer = jest.fn(async () => Promise.resolve([ partialBuffer, undefined ]))

        expect(await cache.acquireBuffer("", 0, 1)).toBe(partialBuffer)
        expect(Object.keys(Object.values(cache.cache)[0]).length).toBe(1)
        expect(Object.values(cache.cache)[0][cacheId]).toBe(partialBuffer)
    })

    test("entire buffer fetched; should cache entire buffer", async () => {
        // Mock
        SdtfHttpClient.prototype.getBinaryBuffer = jest.fn(async () => Promise.resolve([ partialBuffer, entireBuffer ]))

        expect(await cache.acquireBuffer("", 0, 1)).toBe(partialBuffer)
        expect(Object.keys(Object.values(cache.cache)[0]).length).toBe(1)
        expect(Object.values(cache.cache)[0][cache.cacheIdFullBuffer]).toStrictEqual(new DataView(entireBuffer))
    })

})
