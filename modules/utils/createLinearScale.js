const createLinearScale = ({ domain, range }) => {
  const [dStart, dEnd] = domain
  const [rStart, rEnd] = range

  const ratio = (rEnd - rStart) / (dEnd - dStart)

  return val =>
    rStart + ((val - dStart) * ratio)
}

export default createLinearScale
