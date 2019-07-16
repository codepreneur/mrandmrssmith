import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import always from 'lodash/fp/always'
import getOr from 'lodash/fp/getOr'
import { makeStyles } from '@material-ui/styles'

import Typography from '@material-ui/core/Typography'
import Centered from '../Centered'

const useStyles = makeStyles((theme) => {
  const spacing = getOr(always(0), ['spacing'], theme)
  return {
    block: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      alignItems: 'center',
      maxWidth: '48rem',
      minWidth: '20rem',
      padding: spacing(5),
    },
    header: {
      paddingBottom: spacing(2),
    },
    icon: {
      paddingBottom: spacing(2),
    },
    footer: {
      alignItems: 'stretch',
      paddingTop: spacing(4),
      width: '27.5rem',
    },
  }
})

const StateMessage = ({
  actions,
  children,
  className,
  description,
  icon,
  noIconPadding,
  title,
  biggerTitle,
}) => {
  const classes = useStyles()
  return (
    <Centered>
      <section className={clsx(classes.block, classes.container, className)}>
        <header className={clsx(classes.block, classes.header)}>
          {icon && (
            <div className={noIconPadding ? undefined : classes.icon}>
              {icon}
            </div>
          )}
          <Typography
            variant={biggerTitle ? 'h4' : 'h5'}
            component="h2"
            align="center"
            data-mark="state-message"
          >
            {title}
          </Typography>
        </header>
        {(description || children) && (
          <article className={classes.block}>
            {description && (
              <Typography variant="body1" component="p" align="center">
                {description}
              </Typography>
            )}
            {children}
          </article>
        )}
        {actions && (
          <footer className={clsx(classes.block, classes.footer)}>
            {actions}
          </footer>
        )}
      </section>
    </Centered>
  )
}

StateMessage.propTypes = {
  actions: PropTypes.node,
  biggerTitle: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  noIconPadding: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

export default StateMessage
