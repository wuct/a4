import React, { Children, PropTypes, cloneElement } from 'react'
import { getContext } from 'recompose'
import { pipe, map, flatten, prop, groupBy, merge, take, sum } from 'ramda'
import { translateY } from '../charts/utils/translate'

const embedPropsIntoData =
  map(({ props: { data = [], ...otherProps } }) =>
    data.map(merge(otherProps))
  )

const groupChildrenPropsByX = pipe(
  Children.toArray,
  embedPropsIntoData,
  flatten,
  groupBy(prop('x')),
)

const transformY = (groupedProps, index, yScale) => datum => {
  const yOffset = pipe(
    take(index),
    map(prop('y')),
    sum,
    yScale,
  )(groupedProps[datum.x])

  return {
    ...datum,
    transform: translateY(yOffset - yScale(0)),
  }
}

const enhance =
  getContext({
    yScale: PropTypes.func,
    xScale: PropTypes.func,
  })

const Stack = ({
  children,
  yScale,
}) => {
  const groupedProps = groupChildrenPropsByX(children)

  return (
    <g>
      {
        Children.map(children, (child, index) => {
          if (index === 0) return child

          return cloneElement(child, {
            data: child.props.data.map(transformY(groupedProps, index, yScale)),
          })
        })
      }
    </g>
  )
}

export default enhance(Stack)
