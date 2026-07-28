import { SdtfBinarySdtf } from '../../../src/binary_sdtf/SdtfBinarySdtf';
import { SdtfHttpClient } from '../../../src/http/SdtfHttpClient';

describe('calcUrl', function() {
    test('should replace last part of json content url with uri', () => {
        const client = new SdtfHttpClient('https://shapediver.com/api/v2/sdtf/foo.sdtf');
        expect(client.calcUrl('bar/baz.obj')).toBe(
            'https://shapediver.com/api/v2/sdtf/bar/baz.obj'
        );
    });
});

describe('getJsonContent', function() {
    let origFetch: any, origReadHeader: any, origParseBinarySdtf: any;

    const client = new SdtfHttpClient(''),
        headerBuffer = new ArrayBuffer(20),
        jsonContentBuffer = new ArrayBuffer(30),
        binaryBuffer = new DataView(new ArrayBuffer(40));

    beforeAll(() => {
        origFetch = SdtfHttpClient.prototype.fetch;

        origReadHeader = SdtfBinarySdtf.prototype.readHeader;
        SdtfBinarySdtf.prototype.readHeader = jest.fn(() => [20, 10]);

        origParseBinarySdtf = SdtfBinarySdtf.prototype.parseBinarySdtf;
        SdtfBinarySdtf.prototype.parseBinarySdtf = jest.fn(() => [
            new DataView(jsonContentBuffer),
            binaryBuffer,
        ]);
    });

    afterAll(() => {
        SdtfHttpClient.prototype.fetch = origFetch;
        SdtfBinarySdtf.prototype.readHeader = origReadHeader;
        SdtfBinarySdtf.prototype.parseBinarySdtf = origParseBinarySdtf;
    });

    test('partial requests supported; should return only partial buffer', async () => {
        // Mock
        let fetchCounter = 0;
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            fetchCounter++;
            if (fetchCounter === 1) return { data: headerBuffer, partial: true };
            if (fetchCounter === 2) return { data: jsonContentBuffer, partial: true };
            throw new Error('tryFetchPartially was called too often!');
        });

        expect(await client.getJsonContent()).toStrictEqual([
            new DataView(jsonContentBuffer),
            undefined,
        ]);
    });

    test('partial requests not supported; should return entire buffer as well', async () => {
        // Mock
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            return { data: new ArrayBuffer(90), partial: false };
        });

        expect(await client.getJsonContent()).toStrictEqual([
            new DataView(jsonContentBuffer),
            binaryBuffer,
        ]);
    });
});

describe('getBinaryBuffer', function() {
    let origFetch: any;

    const client = new SdtfHttpClient(''),
        partialBuffer = new ArrayBuffer(30),
        entireBuffer = new ArrayBuffer(50);

    beforeAll(() => {
        origFetch = SdtfHttpClient.prototype.fetch;
    });

    afterAll(() => {
        SdtfHttpClient.prototype.fetch = origFetch;
    });

    test('partial requests supported; should return only partial buffer', async () => {
        // Mock
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            return { data: partialBuffer, partial: true };
        });

        expect(await client.getBinaryBuffer('', 0, 30)).toStrictEqual([
            new DataView(partialBuffer),
            undefined,
        ]);
    });

    test('partial requests not supported; should return entire buffer as well', async () => {
        // Mock
        SdtfHttpClient.prototype.fetch = jest.fn(async () => {
            return { data: entireBuffer, partial: false };
        });

        expect(await client.getBinaryBuffer('', 0, 30)).toStrictEqual([
            new DataView(entireBuffer, 0, 30),
            entireBuffer,
        ]);
    });
});

describe('fetch', function() {
    let originalFetch: typeof globalThis.fetch;
    let fetchMock: jest.MockedFunction<typeof globalThis.fetch>;
    let origFetchPartially: any, origFetchFully: any;
    let spyFetchPartially: boolean, spyFetchFully: boolean;

    const partialBuffer = new ArrayBuffer(25),
        fullBuffer = new ArrayBuffer(50),
        client = new SdtfHttpClient('');

    const response = (status: number, headers: Record<string, string> = {}) => ({
        status,
        headers: { get: (name: string) => headers[name.toLowerCase()] ?? null },
    }) as unknown as Response;

    beforeAll(() => {
        originalFetch = globalThis.fetch;
        fetchMock = jest.fn();
        globalThis.fetch = fetchMock;

        origFetchPartially = SdtfHttpClient.prototype.fetchPartially;
        SdtfHttpClient.prototype.fetchPartially = jest.fn(async () => {
            spyFetchPartially = true;
            return partialBuffer;
        });

        origFetchFully = SdtfHttpClient.prototype.fetchFully;
        SdtfHttpClient.prototype.fetchFully = jest.fn(async () => {
            spyFetchFully = true;
            return fullBuffer;
        });
    });

    afterAll(() => {
        globalThis.fetch = originalFetch;
        SdtfHttpClient.prototype.fetchPartially = origFetchPartially;
        SdtfHttpClient.prototype.fetchFully = origFetchFully;
    });

    beforeEach(() => {
        spyFetchPartially = false;
        spyFetchFully = false;
        fetchMock.mockReset();
    });

    test('status code not in 200 range; should throw', async () => {
        fetchMock.mockResolvedValue(response(400));
        await expect(client.fetch('', 10, 25)).rejects.toThrow();
    });

    test('content not encoded, range supported; fetch partially', async () => {
        fetchMock.mockResolvedValue(response(200, {
            'accept-ranges': 'bytes',
            'access-control-allow-methods': 'HEAD, GET',
            'access-control-allow-origin': '*',
            age: '77486',
            'content-length': '59804',
            'content-type': 'model/vnd.sdtf',
            date: 'Tue, 11 Apr 2023 10:32:1u GMT',
            etag: '0afb7dc559527f3ea30f5da16fde4173',
            'last-modified': 'Thu, 09 Mar 2023 17:14:23 GMT',
            server: 'AmazonS3',
            via: '1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)',
            'x-amz-cf-id': 'uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==',
            'x-amz-cf-pop': 'VIE50-P1',
            'x-amz-server-side-encryption': 'AES256',
            'x-amz-storage-class': 'REDUCED_REDUNDANCY',
            'x-cache': 'Hit from cloudfront',
        }));

        const result = await client.fetch('', 10, 25);

        expect(spyFetchPartially).toBeTruthy();
        expect(spyFetchFully).toBeFalsy();
        expect(result).toStrictEqual({ data: partialBuffer, partial: true });
        expect(fetchMock).toHaveBeenCalledWith('', { method: 'HEAD', headers: {} });
    });

    test('content not encoded, range not supported; fetch fully', async () => {
        fetchMock.mockResolvedValue(response(200, {
            'accept-ranges': 'none',
            'access-control-allow-methods': 'HEAD, GET',
            'access-control-allow-origin': '*',
            age: '77486',
            'content-length': '59804',
            'content-type': 'model/vnd.sdtf',
            date: 'Tue, 11 Apr 2023 10:32:1u GMT',
            etag: '0afb7dc559527f3ea30f5da16fde4173',
            'last-modified': 'Thu, 09 Mar 2023 17:14:23 GMT',
            server: 'AmazonS3',
            via: '1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)',
            'x-amz-cf-id': 'uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==',
            'x-amz-cf-pop': 'VIE50-P1',
            'x-amz-server-side-encryption': 'AES256',
            'x-amz-storage-class': 'REDUCED_REDUNDANCY',
            'x-cache': 'Hit from cloudfront',
        }));

        const result = await client.fetch('', 10, 25);

        expect(spyFetchPartially).toBeFalsy();
        expect(spyFetchFully).toBeTruthy();
        expect(result).toStrictEqual({ data: fullBuffer, partial: false });
    });

    test('content encoded; fetch fully', async () => {
        fetchMock.mockResolvedValue(response(200, {
            'accept-ranges': 'bytes',
            'access-control-allow-methods': 'HEAD, GET',
            'access-control-allow-origin': '*',
            age: '77486',
            'content-encoding': 'gzip',
            'content-length': '59804',
            'content-type': 'model/vnd.sdtf',
            date: 'Tue, 11 Apr 2023 10:32:1u GMT',
            etag: '0afb7dc559527f3ea30f5da16fde4173',
            'last-modified': 'Thu, 09 Mar 2023 17:14:23 GMT',
            server: 'AmazonS3',
            via: '1.1 1c6954b6a2b349a78fb0daa669c3e984.cloudfront.net (CloudFront)',
            'x-amz-cf-id': 'uI-GKODnjUurPSDAbIyeXUeIBXRTsOEELqOmO5mSjP9C_DCkKH_nZA==',
            'x-amz-cf-pop': 'VIE50-P1',
            'x-amz-server-side-encryption': 'AES256',
            'x-amz-storage-class': 'REDUCED_REDUNDANCY',
            'x-cache': 'Hit from cloudfront',
        }));

        const result = await client.fetch('', 10, 25);

        expect(spyFetchPartially).toBeFalsy();
        expect(spyFetchFully).toBeTruthy();
        expect(result).toStrictEqual({ data: fullBuffer, partial: false });
    });
});

describe('fetch body methods', function() {
    const client = new SdtfHttpClient('');
    let originalFetch: typeof globalThis.fetch;
    let fetchMock: jest.MockedFunction<typeof globalThis.fetch>;

    beforeEach(() => {
        originalFetch = globalThis.fetch;
        fetchMock = jest.fn();
        globalThis.fetch = fetchMock;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    test('fetchPartially sends a range request and slices an unexpectedly full response', async () => {
        const data = new Uint8Array([0, 1, 2, 3, 4, 5]).buffer;
        fetchMock.mockResolvedValue({ status: 200, arrayBuffer: async () => data } as Response);

        await expect(client.fetchPartially('asset', 2, 2)).resolves.toStrictEqual(data.slice(2, 4));
        expect(fetchMock).toHaveBeenCalledWith('asset', { headers: { range: 'bytes=2-3' } });
    });

    test('fetchPartially rejects invalid ranges', async () => {
        fetchMock.mockResolvedValue({ status: 416 } as Response);
        await expect(client.fetchPartially('asset', 0, 1)).rejects.toThrow('Invalid range requested.');
    });

    test('fetchFully reads an ArrayBuffer', async () => {
        const data = new ArrayBuffer(4);
        fetchMock.mockResolvedValue({ status: 200, arrayBuffer: async () => data } as Response);
        await expect(client.fetchFully('asset')).resolves.toBe(data);
    });
});
