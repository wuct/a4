import { evolve, map, compose } from 'ramda'
import { unixTime } from 'date-fp'


export const createLinearScale = ({ domain, range }) => {
  const [dStart, dEnd] = domain
  const [rStart, rEnd] = range

  const ratio = (rEnd - rStart) / (dEnd - dStart)

  return val =>
    rStart + (val - dStart) * ratio
}


export const createTimeScale = ({ domain, range }) => {
  // TODO: check type

  const unixTimeScale = createLinearScale({
    domain: domain.map(unixTime),
    range
  })

  return compose(unixTimeScale, unixTime)
}

