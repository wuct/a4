import { test } from 'ava'
import { createLinearScale } from '../createScale'

test('createLinearScale', t => {
  const scale = createLinearScale({
    domain: [0, 10],
    range: [0, 100]
  })

  t.is(scale(0), 0)
  t.is(scale(1), 10)
  t.is(scale(10), 100)
  t.is(scale(20), 200)

  const scale2 = createLinearScale({
    domain: [0, 10],
    range: [100, 0]
  })

  t.is(scale2(2), 80)
})
