import { describe, expect, it } from 'vitest';
import json2php from '../src/json2php.js';

const testSymbol = Symbol('test');

describe('json2php', () => {
  it('If you give string you should get string.', () => {
    expect(json2php('dummydummy')).toBe("'dummydummy'");
    expect(json2php("'escaping'quotes'")).toBe("'\\'escaping\\'quotes\\''");
  });

  it('If you give number you should get number.', () => {
    expect(json2php(1)).toBe('1');
    expect(json2php(-1)).toBe('-1');
    expect(json2php(0)).toBe('0');
  });

  it('If you give true or false you should get boolean true or false.', () => {
    expect(json2php(true)).toBe('true');
    expect(json2php(false)).toBe('false');
  });

  it('If you give undefined or null you should get null.', () => {
    expect(json2php(undefined)).toBe('null');
    expect(json2php(null)).toBe('null');
  });

  it('If you give symbol or function you should get null.', () => {
    expect(json2php(testSymbol)).toBe('null');
    expect(json2php(() => 'hello')).toBe('null');
    expect(
      json2php(function greet(name) {
        return `Hello, ${name}!`;
      }),
    ).toBe('null');
  });

  it('If you give a Date you should get a value.', () => {
    expect(json2php(new Date('2020-06-19 18:20:34'))).toBe('2020-06-19T15:20:34.000Z');
  });

  it('If you give a BigInt you should get a value.', () => {
    expect(json2php(BigInt('5544544780524281256998074770286755445447805242812569980747702867'))).toBe(
      '5544544780524281256998074770286755445447805242812569980747702867',
    );
  });

  it('If you give array you should get php array.', () => {
    expect(json2php([1, 2, 3])).toBe('array(1, 2, 3)');
    expect(json2php([1, [2], 3])).toBe('array(1, array(2), 3)');
  });

  it('If you give object you should get php array of it.', () => {
    expect(json2php({ a: 1, c: 'text', false: true, undefined: null })).toBe(
      "array('a' => 1, 'c' => 'text', 'false' => true, 'undefined' => null)",
    );
  });

  it('If you give object you should get php array of it.', () => {
    expect(
      json2php({
        name: 'Noel',
        surname: 'Broda',
        childrens: { John: { name: 'John', surname: 'Bainotti' }, Tin: { name: 'Tin', surname: 'Tassi' } },
      }),
    ).toBe(
      "array('name' => 'Noel', 'surname' => 'Broda', 'childrens' => array('John' => array('name' => 'John', 'surname' => 'Bainotti'), 'Tin' => array('name' => 'Tin', 'surname' => 'Tassi')))",
    );
  });

  it('If you give any other object you should get null.', () => {
    expect(json2php(new AbortController())).toBe('null');
    expect(json2php(new ArrayBuffer())).toBe('null');
    expect(json2php(new URLSearchParams())).toBe('null');
  });
});

describe('json2php.make({linebreak:"🔪", indent:"🧱"})', () => {
  it('returns a pretty printed php array given an array or object.', () => {
    const pretty = json2php.make({ linebreak: '🔪', indent: '🧱' });
    expect(
      pretty([
        'one',
        'two',
        {
          name: 'Noel',
          surname: 'Broda',
          childrens: { John: { name: 'John', surname: 'Bainotti' }, Tin: { name: 'Tin', surname: 'Tassi' } },
        },
      ]),
    ).toBe(
      "array(🔪🧱'one',🔪🧱'two',🔪🧱array(🔪🧱🧱'name' => 'Noel',🔪🧱🧱'surname' => 'Broda',🔪🧱🧱'childrens' => array(🔪🧱🧱🧱'John' => array(🔪🧱🧱🧱🧱'name' => 'John',🔪🧱🧱🧱🧱'surname' => 'Bainotti'🔪🧱🧱🧱),🔪🧱🧱🧱'Tin' => array(🔪🧱🧱🧱🧱'name' => 'Tin',🔪🧱🧱🧱🧱'surname' => 'Tassi'🔪🧱🧱🧱)🔪🧱🧱)🔪🧱)🔪)",
    );
  });
});

describe('json2php.make({shortArraySyntax: true})', () => {
  it('returns a pretty printed php array using short array syntax.', () => {
    const pretty = json2php.make({ shortArraySyntax: true });
    expect(pretty({ a: 1, c: 'text', false: true, undefined: null })).toBe(
      "['a' => 1, 'c' => 'text', 'false' => true, 'undefined' => null]",
    );
    expect(pretty([1, [2], 3])).toBe('[1, [2], 3]');
  });
});

describe('json2php.make({stripSpaces: true})', () => {
  it('compresses output with shortArraySyntax', () => {
    const pretty = json2php.make({ stripSpaces: true, shortArraySyntax: true });
    expect(
      pretty({
        arr: [1, 2, 3, 4, 5, { foo: 'surprise!' }],
        obj: {
          arr: [{ foo: 'bar', bar: 'baz', arr2: [1, 2] }],
        },
        test: 'str',
      }),
    ).toBe(
      "['arr'=>[1,2,3,4,5,['foo'=>'surprise!']],'obj'=>['arr'=>[['foo'=>'bar','bar'=>'baz','arr2'=>[1,2]]]],'test'=>'str']",
    );
  });

  it('strips spaces from simple arrays and objects', () => {
    const pretty = json2php.make({ stripSpaces: true });
    expect(pretty([1, [2, 4, { foo: 'bar', bar: 'baz' }], 3])).toEqual(
      `array(1,array(2,4,array('foo'=>'bar','bar'=>'baz')),3)`,
    );
  });
});
