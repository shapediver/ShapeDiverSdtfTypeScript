import { SdtfBinarySdtf } from '../../../src/binary_sdtf/SdtfBinarySdtf';

const binarySdtf = new SdtfBinarySdtf();

describe('readHeader', function () {
    test('valid sdtf header; should return content length and total length', () => {
        const header = new Uint8Array(456);
        header.set([115, 100, 116, 102], 0); // magic = sdtf (utf-8 encoded)
        header.set([1, 0, 0, 0], 4); // version = 1
        header.set([200, 1, 0, 0], 8); // total length = 456
        header.set([123, 0, 0, 0], 12); // content length = 123
        header.set([0, 0, 0, 0], 16); // format = 0

        const [contentLength, totalLength] = binarySdtf.readHeader(header.buffer);
        expect(contentLength).toBe(123);
        expect(totalLength).toBe(456);
    });

    test('invalid magic; should throw', () => {
        const header = new Uint8Array(456);
        header.set([116, 101, 115, 116], 0); // magic = test (utf-8 encoded)

        expect(() => binarySdtf.readHeader(header.buffer)).toThrow(
            /Unknown file type for sdTF identifier 'test'/
        );
    });

    test('invalid version; should throw', () => {
        const header = new Uint8Array(456);
        header.set([115, 100, 116, 102], 0); // magic = sdtf (utf-8 encoded)
        header.set([0, 0, 0, 0], 4); // version = 0

        expect(() => binarySdtf.readHeader(header.buffer)).toThrow(/Unsupported sdTF version '0'/);
    });

    test('invalid format; should throw', () => {
        const header = new Uint8Array(456);
        header.set([115, 100, 116, 102], 0); // magic = sdtf (utf-8 encoded)
        header.set([1, 0, 0, 0], 4); // version = 1
        header.set([200, 1, 0, 0], 8); // total length = 456
        header.set([123, 0, 0, 0], 12); // content length = 123
        header.set([1, 0, 0, 0], 16); // format = 1

        expect(() => binarySdtf.readHeader(header.buffer)).toThrow(
            /Unsupported sdTF content format '1'/
        );
    });
});

describe('createHeader', function () {
    test('should return header with valid parts', () => {
        const header = binarySdtf.createHeader(123, 456 - 123 - 20);
        const dataView = new DataView(header);

        // magic = sdtf (utf-8 encoded)
        expect(dataView.getUint8(0)).toBe(115);
        expect(dataView.getUint8(1)).toBe(100);
        expect(dataView.getUint8(2)).toBe(116);
        expect(dataView.getUint8(3)).toBe(102);

        // version = 1
        expect(dataView.getUint8(4)).toBe(1);
        expect(dataView.getUint8(5)).toBe(0);
        expect(dataView.getUint8(6)).toBe(0);
        expect(dataView.getUint8(7)).toBe(0);

        // total length = 456
        expect(dataView.getUint8(8)).toBe(200);
        expect(dataView.getUint8(9)).toBe(1);
        expect(dataView.getUint8(10)).toBe(0);
        expect(dataView.getUint8(11)).toBe(0);

        // content length = 123
        expect(dataView.getUint8(12)).toBe(123);
        expect(dataView.getUint8(13)).toBe(0);
        expect(dataView.getUint8(14)).toBe(0);
        expect(dataView.getUint8(15)).toBe(0);

        // format = 0
        expect(dataView.getUint8(16)).toBe(0);
        expect(dataView.getUint8(17)).toBe(0);
        expect(dataView.getUint8(18)).toBe(0);
        expect(dataView.getUint8(19)).toBe(0);
    });

    test('sanity check; created header should be readable', () => {
        const header = binarySdtf.createHeader(123, 456);
        expect(binarySdtf.readHeader(header)).toStrictEqual([123, 20 + 123 + 456]);
    });
});
