// coordinates is an array of coordinate
// [[x0, y0], [x1, y1] ... ]

const createPath = (coordinates = []) =>
  coordinates.reduce((path, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    return `${path}L${x},${y}`
  }, '')

export default createPath
