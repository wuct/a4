import { range } from 'ramda'

const getTicks = (count, start, end) => {
  const interval = (end - start) / (count - 1)
  return range(0, count).map(i => start + i * interval)
}

export default getTicks