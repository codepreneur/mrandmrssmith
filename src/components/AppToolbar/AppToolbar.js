import React from 'react'
import clsx from 'clsx'

import always from 'lodash/fp/always'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'

import { makeStyles } from '@material-ui/styles'

import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import TransformIcon from '@material-ui/icons/Transform'

import { version } from '../../../package.json'

const useStyles = makeStyles((theme) => {
  const spacing = getOr(always(0), ['spacing'], theme)
  return {
    grow: {
      flexGrow: 1,
    },
    logo: {
      fontSize: '4.2rem',
      marginRight: spacing(2),
      position: 'relative',
      top: '-0.2rem',
    },
    title: {
      fontWeight: get(['typography', 'fontWeightLight'], theme),
      marginLeft: spacing(2.75),
      paddingLeft: spacing(2.75),
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderLeftColor: 'rgba(255,255,255,0.33)',
    },
    logoBlock: {
      alignItems: 'center',
      alignSelf: 'stretch',
      color: 'inherit',
      display: 'inline-flex',
      textDecoration: 'none',
    },
    tooltipPlacementBottom: {
      margin: [[spacing(0.5), 0]],
    },
  }
})

const AppToolbar = () => {
  const classes = useStyles()
  return (
    <Toolbar id="app-toolbar">
      <Tooltip
        title={`version ${version || '0.0.0'}`}
        enterDelay={1000}
        classes={{
          tooltipPlacementBottom: classes.tooltipPlacementBottom,
        }}
      >
        <div className={classes.logoBlock}>
          <TransformIcon className={classes.logo} />
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            <Hidden smUp>Mr and Mrs Smith</Hidden>
            <Hidden xsDown>Mr and Mrs Smith Test</Hidden>
          </Typography>
        </div>
      </Tooltip>
      <Typography
        component="h2"
        variant="h6"
        color="inherit"
        className={clsx(classes.grow, classes.title)}
        noWrap
      >
        where earthquakes have happened
      </Typography>
    </Toolbar>
  )
}

export default AppToolbar
