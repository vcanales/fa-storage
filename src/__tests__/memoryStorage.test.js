const memoryStorage = require('../memory');
const setup = () => memoryStorage();

describe('> memoryStorage', () => {
  test('typeof memoryStorage must be a function', () => {
    const actual = typeof memoryStorage;
    const expected = 'function';

    expect(actual).toBe(expected);
  });

  test('memoryStorage() ---> must be an object having the minimum interface', () => {
    const keys = ['clear', 'key', 'setItem', 'getItem', 'removeItem'];
    const instance = setup();

    keys.forEach(key => {
      const actual = typeof instance[key];
      const expected = 'function';

      expect(actual).toBe(expected);
    });
  });

  test('it should return null in case of lacking a stored key => value', () => {
    const actual = setup().getItem('unexisting key');
    const expected = null;

    expect(actual).toBe(expected);
  });

  test('it should save a key => value with setItem', () => {
    const instance = setup();
    instance.setItem('foo', 'bar');

    const actual = instance.getItem('foo');
    const expected = 'bar';

    expect(actual).toBe(expected);
  });

  test('it should remove all key/values using clear method', () => {
    const instance = setup();
    instance.setItem('foo', 'bar');

    expect(instance.length).toBe(1);

    instance.clear();

    expect(instance.length).toBe(0);
  });

  test('it should give the proper key using index', () => {
    const instance = setup();
    instance.setItem('foo', 'bar');
    instance.setItem('baz', 'quoox');

    const keys = ['foo', 'baz'];

    keys.forEach((expected, index) => {
      const actual = instance.key(index);
      expect(actual).toBe(expected);
    });
  });
});
