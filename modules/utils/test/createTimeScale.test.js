import { test } from 'ava'
import createTimeScale from '../createTimeScale'

test('createTimeScale', t => {
  const scale = createTimeScale({
    domain: [new Date('2016-01-01'), new Date('2016-01-10')],
    range: [1, 10],
  })

  t.is(scale(new Date('2016-01-02')), 2)
  t.is(scale(new Date('2016-01-11')), 11)
})
