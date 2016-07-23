const getLineCoordinate = (axis, start, end) => ({
  [`${axis}1`]: start,
  [`${axis}2`]: end,
})

export default getLineCoordinate
