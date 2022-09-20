import { Client } from '../src';

import { mockConfig } from './Mocks';

describe('Validator', () => {
  // const validateSpy = jest.spyOn(validator, 'validate');

  // const trueRule = jest.fn(() => true);

  describe('.setRule', () => {
    const client = new Client(null, true);

    test('registers rule when called', () => {
      const validateConfigSpy = jest
        .spyOn(client, 'validateConfig')
        .mockReturnValue(undefined);

      expect(client.setApiKey('wa wa aw  wawa wa ')).toBe(undefined);

      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: 'wa wa aw  wawa wa '
      });

      // setRuleSpy.mockClear();
    });
  });

  describe.only('wwwwwwww', () => {
    const client = new Client();

    test('aaaaaaaaaaa', () => {
      expect(() => client.validateConfig(mockConfig)).toThrow(
        'apiKey cannot contain whitespace'
      );

      // setRuleSpy.mockClear();
    });
  });
});
