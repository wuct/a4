import { test } from 'ava'
import getExtent from '../getExtent'

test('getExtent', (t) => {
  const extent = getExtent([1, 1.5, 19, 42, -4, 0])

  t.deepEqual(extent, [-4, 42])
})
