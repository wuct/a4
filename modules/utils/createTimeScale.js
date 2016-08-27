import D from 'date-fp'
import R from 'ramda'
import createLinearScale from './createLinearScale'

const createTimeScale = ({ domain, range }) => {
  // TODO: check type

  const unixTimeScale = createLinearScale({
    domain: domain.map(D.unixTime),
    range,
  })

  return R.compose(unixTimeScale, D.unixTime)
}

export default createTimeScale
