import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'

import { makeStyles } from '@material-ui/styles'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'

const drawerWidth = 275

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: 'calc(var(--vh, 1vh) * 100)',
    fallbacks: {
      minHeight: '100vh',
    },
  },
  fixedHeight: {
    height: 'calc(var(--vh, 1vh) * 100)',
    fallbacks: {
      height: '100vh',
    },
  },
  appBar: {
    zIndex: getOr(0, ['zIndex', 'drawer'], theme) + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  toolbar: get(['mixins', 'toolbar'], theme),
}))

const MainLayout = ({ appBar, drawer, fixedHeight, children }) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root, fixedHeight && classes.fixedHeight)}>
      <AppBar position="fixed" className={classes.appBar}>
        {appBar}
      </AppBar>
      {drawer && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          {drawer}
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

MainLayout.propTypes = {
  appBar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  drawer: PropTypes.node,
  fixedHeight: PropTypes.bool,
  hideSearch: PropTypes.bool,
}

export default MainLayout
