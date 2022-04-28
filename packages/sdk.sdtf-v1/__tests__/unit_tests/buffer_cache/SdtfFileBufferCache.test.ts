import { SdtfFileBufferCache } from "../../../src/buffer_cache/SdtfFileBufferCache"
import { SdtfFileUtils } from "../../../src/utils/SdtfFileUtils"

describe("acquireBuffer", function () {

    let origReadFile: any

    let cache: SdtfFileBufferCache

    const buffer = new ArrayBuffer(10)

    beforeAll(() => {
        origReadFile = SdtfFileUtils.prototype.readFile
        SdtfFileUtils.prototype.readFile = jest.fn(() => Promise.resolve(buffer))
    })

    afterAll(() => {
        SdtfFileUtils.prototype.readFile = origReadFile
    })

    beforeEach(() => {
        cache = new SdtfFileBufferCache("")
    })

    test("should cache entire buffer", async () => {
        const bufferPart = await cache.acquireBuffer("foobar", 0, 1)
        expect(bufferPart.byteLength).toBe(1)
        expect(Object.keys(Object.values(cache.cache)[0]).length).toBe(1)
        expect(Object.values(cache.cache)[0][cache.cacheIdFullBuffer]).toStrictEqual(new DataView(buffer))
    })

})
