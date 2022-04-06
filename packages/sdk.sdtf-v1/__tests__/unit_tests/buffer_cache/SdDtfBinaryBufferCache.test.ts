import { SdDtfBinaryBufferCache } from "../../../src/buffer_cache/SdDtfBinaryBufferCache"

describe("calcCacheKey", function () {

    const cache = new SdDtfBinaryBufferCache()

    test("no uri; should return hash", () => {
        expect(cache.calcCacheKey()).toBeDefined()
    })

    test("uri given; should return hash", () => {
        expect(cache.calcCacheKey("foobar")).toBeDefined()
    })

})

describe("calcCacheId", function () {

    const cache = new SdDtfBinaryBufferCache()

    test("should return id", () => {
        expect(cache.calcCacheId(123, 456)).toBe("123;456")
    })

})

describe("loadFromCache", function () {

    let origCalcCacheId: any

    let cache: SdDtfBinaryBufferCache

    const key = "key",
        id = "id",
        offset = 123,
        length = 456

    beforeAll(() => {
        origCalcCacheId = SdDtfBinaryBufferCache.prototype.calcCacheId
        SdDtfBinaryBufferCache.prototype.calcCacheId = jest.fn(() => id)
    })

    afterAll(() => {
        SdDtfBinaryBufferCache.prototype.calcCacheId = origCalcCacheId
    })

    beforeEach(() => {
        cache = new SdDtfBinaryBufferCache()
    })

    test("not found in cache; should return undefined", () => {
        expect(cache.loadFromCache(key, offset, length)).toBeUndefined()
    })

    test("buffer for range found in cache; should return buffer", () => {
        // @ts-ignore: Prepare internal cache
        cache.cache[key] = { [id]: new DataView(new Uint8Array(length).buffer) }

        const item = cache.loadFromCache(key, offset, length)
        expect(item).toBeDefined()
        expect(item?.byteLength).toBe(length)
    })

    test("entire buffer found in cache; should return buffer in range", () => {
        // @ts-ignore: Prepare internal cache
        cache.cache[key] = { [cache.cacheIdFullBuffer]: new DataView(new Uint8Array(1000).buffer) }

        const item = cache.loadFromCache(key, offset, length)
        expect(item).toBeDefined()
        expect(item?.byteLength).toBe(length)
    })

})

describe("storeInCache", function () {

    let cache: SdDtfBinaryBufferCache

    const key = "foo",
        id = "bar",
        buffer = new DataView(new Uint8Array(333).buffer)

    beforeEach(() => {
        cache = new SdDtfBinaryBufferCache()
    })

    test("no items for cache key; should create item for cache key", () => {
        cache.storeInCache(key, id, buffer)

        expect(cache.cache[key][id]).toBe(buffer)
    })

    test("items for cache key already exist; should add item to cache key", () => {
        // @ts-ignore: Prepare internal cache
        cache.cache[key] = { ["qux"]: new DataView(new Uint8Array(123).buffer) }

        cache.storeInCache(key, id, buffer)

        expect(cache.cache[key][id]).toBe(buffer)
        expect(cache.cache[key]["qux"]).toBeDefined()
    })

})

describe("setBinaryBody", function () {

    let origCalcCacheKey: any

    let cache: SdDtfBinaryBufferCache

    const key = "foobar",
        buffer = new DataView(new Uint8Array(333).buffer)

    beforeAll(() => {
        origCalcCacheKey = SdDtfBinaryBufferCache.prototype.calcCacheKey
        SdDtfBinaryBufferCache.prototype.calcCacheKey = jest.fn(() => key)
    })

    afterAll(() => {
        SdDtfBinaryBufferCache.prototype.calcCacheKey = origCalcCacheKey
    })

    beforeEach(() => {
        cache = new SdDtfBinaryBufferCache()
    })

    test("binary buffer defined; should set buffer with 'full'-key", () => {
        cache.setBinaryBody(buffer)

        expect(cache.cache[key][cache.cacheIdFullBuffer]).toBe(buffer)
    })

    test("binary buffer not defined; should return", () => {
        cache.setBinaryBody(undefined)

        expect(cache.cache).toStrictEqual({})
    })

})

describe("getBuffer", function () {

    let origLoadFromCache: any, origAcquireBuffer: any

    let cache: SdDtfBinaryBufferCache

    const buffer = new DataView(new Uint8Array(123).buffer)

    beforeAll(() => {
        origLoadFromCache = SdDtfBinaryBufferCache.prototype.loadFromCache
        origAcquireBuffer = SdDtfBinaryBufferCache.prototype.acquireBuffer
    })

    afterAll(() => {
        SdDtfBinaryBufferCache.prototype.loadFromCache = origLoadFromCache
        SdDtfBinaryBufferCache.prototype.acquireBuffer = origAcquireBuffer
    })

    beforeEach(() => {
        cache = new SdDtfBinaryBufferCache()
    })

    test("buffer found in cache; should not acquire new buffer", async () => {
        let spyAcquireBuffer = false

        // Mocks
        SdDtfBinaryBufferCache.prototype.loadFromCache = jest.fn(() => buffer)
        SdDtfBinaryBufferCache.prototype.acquireBuffer = jest.fn(async () => {
            spyAcquireBuffer = true
            return buffer
        })

        expect(await cache.getBuffer("", 0, 1)).toBe(buffer)
        expect(spyAcquireBuffer).toBeFalsy()
    })

    test("buffer not found in cache; should acquire new buffer", async () => {
        let spyAcquireBuffer = false

        // Mocks
        SdDtfBinaryBufferCache.prototype.loadFromCache = jest.fn(() => undefined)
        SdDtfBinaryBufferCache.prototype.acquireBuffer = jest.fn(async () => {
            spyAcquireBuffer = true
            return buffer
        })

        expect(await cache.getBuffer("", 0, 1)).toBe(buffer)
        expect(spyAcquireBuffer).toBeTruthy()
    })

})
