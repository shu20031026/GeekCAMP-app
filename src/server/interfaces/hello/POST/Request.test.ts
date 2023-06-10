import { HelloRequestDataValidate } from './Request';

describe('Hello Post Request Tests', () => {
  test('normal validation', () => {
    const data = {
      name: 'Jon',
    };
    HelloRequestDataValidate(data);
  });
  test('abnormal validation', () => {
    const data = {
      name: '',
    };
    expect(() => HelloRequestDataValidate(data)).toThrowError();
  });
});
