import { SdDtfFileBufferCache } from "../../src/buffer_cache/SdDtfFileBufferCache"
import { SdDtfFileUtils } from "../../src/utils/SdDtfFileUtils"

describe("acquireBuffer", function () {

    let origReadFile: any

    let cache: SdDtfFileBufferCache

    const buffer = new ArrayBuffer(10)

    beforeAll(() => {
        origReadFile = SdDtfFileUtils.prototype.readFile
        SdDtfFileUtils.prototype.readFile = jest.fn(() => buffer)
    })

    afterAll(() => {
        SdDtfFileUtils.prototype.readFile = origReadFile
    })

    beforeEach(() => {
        cache = new SdDtfFileBufferCache("")
    })

    test("should cache entire buffer", async () => {
        const bufferPart = await cache.acquireBuffer("foobar", 0, 1)
        expect(bufferPart.byteLength).toBe(1)
        expect(Object.keys(Object.values(cache.cache)[0]).length).toBe(1)
        expect(Object.values(cache.cache)[0][cache.cacheIdFullBuffer]).toStrictEqual(new DataView(buffer))
    })

})
