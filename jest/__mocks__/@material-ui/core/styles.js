import React from 'react'
import idObj from 'identity-obj-proxy'
import isFunction from 'lodash/isFunction'
import { wrapDisplayName } from 'recompose'

import * as styles from '@material-ui/core/styles'

const processStyles = (componentStyles) => {
  if (isFunction(componentStyles)) {
    try {
      componentStyles({})
    } catch (error) {
      // eslint-disable-next-line
      console.warn(`Unsafe access of MUI theme properties: ${error.message}`)
    }
  }
  return idObj
}

const withStyles = (componentStyles) => (BaseComponent) => {
  const classes = processStyles(componentStyles)
  const WithStyles = (props) => <BaseComponent {...props} classes={classes} />
  WithStyles.displayName = wrapDisplayName(BaseComponent, 'WithStyles')
  return WithStyles
}

module.exports = { ...styles, withStyles }
