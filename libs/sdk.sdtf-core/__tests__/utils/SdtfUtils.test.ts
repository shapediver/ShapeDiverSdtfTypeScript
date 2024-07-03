import { SdtfError } from '../../src/SdtfError';
import { isSdtfError } from '../../src/utils/SdtfUtils';

describe('isSdtfError', function () {
    test.each([['SdtfError', new SdtfError('foobar')]])('%s; should be truthy', (_, error) => {
        expect(isSdtfError(error)).toBeTruthy();
    });

    test.each([
        ['JS-error', new Error('')],
        ['object', { message: '' }],
    ])('%s; should be false', (_, error) => {
        expect(isSdtfError(error)).toBeFalsy();
    });
});
