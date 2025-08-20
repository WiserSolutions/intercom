/* eslint-env jest */
import { shallowEqual } from '../../utils/shallowEqual'

describe('shallowEqual', () => {
  test('primitives and nullish', () => {
    expect(shallowEqual(1, 1)).toBe(true)
    expect(shallowEqual('a', 'a')).toBe(true)
    expect(shallowEqual(null, null)).toBe(true)
    expect(shallowEqual(undefined, undefined)).toBe(true)
    expect(shallowEqual(1, 2)).toBe(false)
    expect(shallowEqual(null, undefined)).toBe(false)
  })

  test('dates', () => {
    expect(shallowEqual(new Date(0), new Date(0))).toBe(true)
    expect(shallowEqual(new Date(0), new Date(1))).toBe(false)
  })

  test('arrays', () => {
    expect(shallowEqual([1, 2], [1, 2])).toBe(true)
    expect(shallowEqual([1, 2], [2, 1])).toBe(false)
    expect(shallowEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  test('plain objects', () => {
    expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false)
    expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  })

  test('non-plain objects unequal unless same ref', () => {
    class Foo {}
    const a = new Foo()
    const b = new Foo()
    expect(shallowEqual(a, a)).toBe(true)
    expect(shallowEqual(a, b)).toBe(false)
  })
})
