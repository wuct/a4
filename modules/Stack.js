import React, { Children, cloneElement, PropTypes } from 'react'
import { setPropTypes } from 'recompose'
import R from 'ramda'
import { translateY } from './utils/translate'

const groupChildrenPropsByX = R.pipe(
  Children.toArray,
  R.map(R.pathOr([], ['props', 'data'])),
  R.flatten,
  R.groupBy(R.prop('x')),
)

const createTransformY = (groupedProps, yScale, index) => (datum) => {
  const {
    [R.prop('x', datum)]: currentGroup,
  } = groupedProps

  const sumOfYOffset = R.compose(
    yScale,
    R.sum,
    R.map(R.prop('y')),
    R.take(index),
  )(currentGroup)

  return R.assocPath(
    ['props', 'transform'],
    translateY(sumOfYOffset - yScale(0)),
    datum
  )
}

const enhance =
  setPropTypes({
    yScale: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
  })

const Stack = ({
  children,
  yScale, // Stacked charts should have the same scale.
}) => {
  // TODO: warn if children is not a array with at least 2 items

  const groupedProps = groupChildrenPropsByX(children)

  return (
    <g>
      {
        Children.map(children, (child, index) => {
          if (index === 0) return child

          const transformY = createTransformY(groupedProps, yScale, index)

          return cloneElement(child, {
            data: child.props.data.map(transformY),
          })
        })
      }
    </g>
  )
}

export default enhance(Stack)
