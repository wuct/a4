const translate = (x, y) => `translate(${x}, ${y})`

export default translate
export const translateX = x => translate(x, 0)
export const translateY = y => translate(0, y)
