import * as fs from "fs"
import * as path from "path"
import { SdDtfParser } from "../../src/reader/SdDtfParser"

const parser = new SdDtfParser()

describe("readFromFile", function () {

    test("absolute path given; should return asset object", () => {
        const absolutePath = path.resolve("./test_data/sdTF_spec_example.sdtf")
        const asset = parser.readFromFile(absolutePath)
        expect(asset).toBeDefined()
    })

    test("relative path given; should return asset object", () => {
        const asset = parser.readFromFile("./test_data/sdTF_spec_example.sdtf")
        expect(asset).toBeDefined()
    })

})

describe("readFromBuffer", function () {

    test("should return asset object", () => {
        const file = fs.readFileSync("./test_data/sdTF_spec_example.sdtf")
        const asset = parser.readFromBuffer(file.buffer)
        expect(asset).toBeDefined()
    })

})
