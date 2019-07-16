import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    overflowY: 'scroll',
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },
}

const Centered = ({
  component: Component,
  classes,
  className,
  children,
  ...forwardedProps
}) => (
  <Component {...forwardedProps} className={clsx(classes.root, className)}>
    {children}
  </Component>
)

Centered.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

Centered.defaultProps = {
  component: 'div',
}

export default withStyles(styles)(Centered)
