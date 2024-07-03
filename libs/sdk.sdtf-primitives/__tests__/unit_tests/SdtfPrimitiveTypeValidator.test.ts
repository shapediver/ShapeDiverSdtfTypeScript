import { ISdtfReadableAccessor, SdtfPrimitiveTypeHintName } from '@shapediver/sdk.sdtf-core';
import { Decimal } from 'decimal.js';
import { SdtfPrimitiveTypeValidator } from '../../src/SdtfPrimitiveTypeValidator';

const validator = new SdtfPrimitiveTypeValidator();

describe('validateBooleanType', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.BOOLEAN, false)).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.BOOLEAN, 'true')).toBeFalsy();
    });
});

describe('validateCharType', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.CHAR, 'C')).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.CHAR, 'ch')).toBeFalsy();
    });
});

describe('validateColorType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.COLOR, '0, 0, 0')
        ).toBeTruthy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.COLOR, '1,1,1,1')
        ).toBeTruthy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.COLOR,
                [0.0, 0.74901960784313726, 1.0]
            )
        ).toBeTruthy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.COLOR,
                [0.0, 0.74901960784313726, 1.0, 1.0]
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.COLOR, [0, 0])).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.COLOR, [0, 0, 0, 1, 1])
        ).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.COLOR, '0,0')).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.COLOR, '0,0,0,0,0')
        ).toBeFalsy();
    });
});

describe('validateDataType', function () {
    test('valid', () => {
        // is stored in buffer, not in json content
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DATA,
                undefined,
                {} as ISdtfReadableAccessor
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        // value must not be defined
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DATA,
                'foobar',
                {} as ISdtfReadableAccessor
            )
        ).toBeFalsy();
    });
});

describe('validateDecimalType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DECIMAL,
                79228162514264337593543950335
            )
        ).toBeTruthy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DECIMAL,
                -79228162514264337593543950335
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DECIMAL,
                '0.3333333333333333333333333333'
            )
        ).toBeFalsy();
    });
});

describe('validateDoubleType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DOUBLE,
                new Decimal(1.7976931348623157e308).toNumber()
            )
        ).toBeTruthy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DOUBLE,
                new Decimal(-1.7976931348623157e308).toNumber()
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.DOUBLE, '0.3333333333333333')
        ).toBeFalsy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DOUBLE,
                new Decimal(1.7976931348623157e309).toNumber()
            )
        ).toBeFalsy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.DOUBLE,
                new Decimal(-1.7976931348623157e309).toNumber()
            )
        ).toBeFalsy();
    });
});

describe('validateGuidType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.GUID,
                '77bdc9dd-55be-4c90-865d-144da1d6a3ab'
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.GUID, 'foobar')).toBeFalsy();
    });
});

describe('validateImageType', function () {
    test('valid', () => {
        // is stored in buffer, not in json content
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.IMAGE,
                undefined,
                {} as ISdtfReadableAccessor
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        // value must not be defined
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.IMAGE,
                'foobar',
                {} as ISdtfReadableAccessor
            )
        ).toBeFalsy();
    });
});

describe('validateInt8Type', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT8, -128)).toBeTruthy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT8, 127)).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT8, '0')).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT8, -129)).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT8, 128)).toBeFalsy();
    });
});

describe('validateInt16Type', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT16, -32768)).toBeTruthy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT16, 32767)).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT16, '0')).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT16, -32769)).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT16, 32768)).toBeFalsy();
    });
});

describe('validateInt32Type', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT32, -2147483648)
        ).toBeTruthy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT32, 2147483647)
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT32, '0')).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT32, -2147483649)
        ).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT32, 2147483648)
        ).toBeFalsy();
    });
});

describe('validateInt64Type', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT64, -9223372036854775808)
        ).toBeTruthy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT64, 9223372036854775807)
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.INT64, '0')).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT64, -Number.MAX_VALUE)
        ).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.INT64, Number.MAX_VALUE)
        ).toBeFalsy();
    });
});

describe('validateJsonType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.JSON, { foo: 'bar' })
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.JSON, 'foobar')).toBeFalsy();
    });
});

describe('validateSingleType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.SINGLE,
                new Decimal(3.40282347e38).toNumber()
            )
        ).toBeTruthy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.SINGLE,
                new Decimal(-3.40282347e38).toNumber()
            )
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.SINGLE, '0.33333334')
        ).toBeFalsy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.SINGLE,
                new Decimal(3.40282347e39).toNumber()
            )
        ).toBeFalsy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.SINGLE,
                new Decimal(3.402823471e38).toNumber()
            )
        ).toBeFalsy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.SINGLE,
                new Decimal(-3.40282347e39).toNumber()
            )
        ).toBeFalsy();
        expect(
            validator.validateComponent(
                SdtfPrimitiveTypeHintName.SINGLE,
                new Decimal(-3.402823471e38).toNumber()
            )
        ).toBeFalsy();
    });
});

describe('validateStringType', function () {
    test('valid', () => {
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.STRING, 'foobar')
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.STRING, 1234)).toBeFalsy();
    });
});

describe('validateUint8Type', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT8, 0)).toBeTruthy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT8, 255)).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT8, '0')).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT8, -1)).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT8, 256)).toBeFalsy();
    });
});

describe('validateUint16Type', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT16, 0)).toBeTruthy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT16, 65535)).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT16, '0')).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT16, -1)).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT16, 65536)).toBeFalsy();
    });
});

describe('validateUint32Type', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT32, 0)).toBeTruthy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.UINT32, 4294967295)
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT32, '0')).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT32, -1)).toBeFalsy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.UINT32, 4294967296)
        ).toBeFalsy();
    });
});

describe('validateUint64Type', function () {
    test('valid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT64, 0)).toBeTruthy();
        expect(
            validator.validateComponent(SdtfPrimitiveTypeHintName.UINT64, Number.MAX_SAFE_INTEGER)
        ).toBeTruthy();
    });

    test('invalid', () => {
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT64, '0')).toBeFalsy();
        expect(validator.validateComponent(SdtfPrimitiveTypeHintName.UINT64, -1)).toBeFalsy();
    });
});
