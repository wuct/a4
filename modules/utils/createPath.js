// coordinates is an array of coordinate
// [{x, y}, {x, y} ... ]

const createPath = (coordinates = []) =>
  coordinates.reduce((path, {x, y}, i) => {
    if (i === 0) return `M${x},${y}`
    return `${path}L${x},${y}`
  }, '')

export default createPath
