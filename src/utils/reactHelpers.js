import React from 'react'

import isFunction from 'lodash/fp/isFunction'
import isPlainObject from 'lodash/fp/isPlainObject'
import reduce from 'lodash/fp/reduce'
import uniqueId from 'lodash/uniqueId'

export const interleaveTextWithComponent = (settings, array) => {
  const defaults = {
    GlueComponent: 'br',
    glueProps: {},
    WrapperComponent: 'span',
    wrapperProps: {},
  }
  const config = isPlainObject(settings)
    ? {
        ...defaults,
        ...settings,
      }
    : {
        ...defaults,
        GlueComponent: settings,
      }
  return reduce(
    (children, item) => {
      const length = children.length
      if (length > 0) {
        children.push(
          <config.GlueComponent
            key={uniqueId('inner')}
            {...config.glueProps}
          />,
        )
      }
      children.push(
        <config.WrapperComponent
          key={uniqueId('outer')}
          {...(isFunction(config.wrapperProps)
            ? config.wrapperProps(item)
            : config.wrapperProps)}
        >
          {item}
        </config.WrapperComponent>,
      )
      return children
    },
    [],
    array,
  )
}
