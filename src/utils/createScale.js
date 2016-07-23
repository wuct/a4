export const createLinearScale = ({ domain, range }) => {
  const [dmin, dmax] = domain
  const [rmin, rmax] = range

  const ratio = (rmax - rmin) / (dmax - dmin)

  return val =>
    (val - dmin) * ratio
}

