import { ISdtfIntegration, ISdtfTypeReader, ISdtfTypeWriter } from '@shapediver/sdk.sdtf-core';
import { SdtfBinaryBufferCache } from '../../../src/buffer_cache/SdtfBinaryBufferCache';
import { SdtfReadableAccessor } from '../../../src/reader/components/SdtfReadableAccessor';
import { SdtfReadableBuffer } from '../../../src/reader/components/SdtfReadableBuffer';
import { SdtfReadableBufferView } from '../../../src/reader/components/SdtfReadableBufferView';
import { SdtfReadableTypeHint } from '../../../src/reader/components/SdtfReadableTypeHint';
import { SdtfDataParser } from '../../../src/reader/SdtfDataParser';

const bufferCache = new SdtfBinaryBufferCache();

describe('parseValue', function () {
    let isSupported: boolean;
    const parsedContent: unknown = 'parsed content',
        accessorData = new DataView(new ArrayBuffer(1)),
        typeHint = new SdtfReadableTypeHint('type'),
        buffer = new SdtfReadableBuffer(1, bufferCache),
        bufferView = new SdtfReadableBufferView(buffer, 1, 0, ''),
        accessor = new SdtfReadableAccessor(bufferView);

    const dummyReader: ISdtfTypeReader = {
            readComponent() {
                return Promise.resolve(parsedContent);
            },
        },
        dummyIntegration: ISdtfIntegration = {
            isTypeHintSupported() {
                return isSupported;
            },
            getReader() {
                return dummyReader;
            },
            getWriter: function (): ISdtfTypeWriter {
                throw new Error('Should not be called in this test.');
            },
            async init() {},
        };

    beforeAll(() => {
        accessor.getContent = jest.fn(async () => Promise.resolve({ data: accessorData }));
    });

    test('no integrations; should return value', async () => {
        expect(await new SdtfDataParser([]).parseContent({ typeHint, value: 'foobar' })).toBe(
            'foobar'
        );
    });

    test('type hint is supported; should return parsed content', async () => {
        isSupported = true;
        expect(await new SdtfDataParser([dummyIntegration]).parseContent({})).toBe(parsedContent);
    });

    test('type hint not supported, value and accessor exist; should return value', async () => {
        isSupported = false;
        expect(
            await new SdtfDataParser([dummyIntegration]).parseContent({
                accessor,
                typeHint,
                value: 'foobar',
            })
        ).toBe('foobar');
    });

    test('type hint not supported, value exist; should return value', async () => {
        isSupported = false;
        expect(
            await new SdtfDataParser([dummyIntegration]).parseContent({
                typeHint,
                value: 'foobar',
            })
        ).toBe('foobar');
    });

    test('type hint not supported, accessor exist; should return accessor data', async () => {
        isSupported = false;
        expect(
            await new SdtfDataParser([dummyIntegration]).parseContent({
                accessor,
                typeHint,
            })
        ).toStrictEqual({ data: accessorData });
    });
});
