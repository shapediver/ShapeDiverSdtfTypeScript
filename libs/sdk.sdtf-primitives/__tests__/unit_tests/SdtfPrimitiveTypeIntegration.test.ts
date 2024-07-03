import { SdtfPrimitiveTypeHintName } from '@shapediver/sdk.sdtf-core';
import { SdtfPrimitiveTypeIntegration } from '../../src';

const integration = new SdtfPrimitiveTypeIntegration();

describe('isTypeHintSupported', function () {
    test.each([
        SdtfPrimitiveTypeHintName.BOOLEAN,
        SdtfPrimitiveTypeHintName.CHAR,
        SdtfPrimitiveTypeHintName.COLOR,
        SdtfPrimitiveTypeHintName.DATA,
        SdtfPrimitiveTypeHintName.DECIMAL,
        SdtfPrimitiveTypeHintName.DOUBLE,
        SdtfPrimitiveTypeHintName.GUID,
        SdtfPrimitiveTypeHintName.IMAGE,
        SdtfPrimitiveTypeHintName.INT8,
        SdtfPrimitiveTypeHintName.INT16,
        SdtfPrimitiveTypeHintName.INT32,
        SdtfPrimitiveTypeHintName.INT64,
        SdtfPrimitiveTypeHintName.JSON,
        SdtfPrimitiveTypeHintName.SINGLE,
        SdtfPrimitiveTypeHintName.STRING,
        SdtfPrimitiveTypeHintName.UINT8,
        SdtfPrimitiveTypeHintName.UINT16,
        SdtfPrimitiveTypeHintName.UINT32,
        SdtfPrimitiveTypeHintName.UINT64,
    ])('supported type %s; should return true', (type) => {
        expect(integration.isTypeHintSupported(type)).toBeTruthy();
    });

    test('unsupported type; should return false', () => {
        expect(integration.isTypeHintSupported('foobar')).toBeFalsy();
    });
});
