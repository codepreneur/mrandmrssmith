import React from 'react'
import PropTypes from 'prop-types'

import { HelmetProvider, Helmet } from 'react-helmet-async'
import { ErrorBoundary, reasons } from '../../utils/ErrorReporting'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import ViewportCSSVariables from '../ViewportCSSVariables'

import theme from './theme'

const lightTheme = createMuiTheme(theme)
const siteName = 'Mr and Mrs Smith'

const App = ({ children }) => (
  <HelmetProvider>
    <Helmet defaultTitle={siteName} titleTemplate={`%s | ${siteName}`}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700"
      />
    </Helmet>
    <ViewportCSSVariables />
    <MuiThemeProvider theme={lightTheme}>
      <CssBaseline />
      <ErrorBoundary defaultReason={reasons.INTERNAL_ERROR} fullScreenHeight>
        {children}
      </ErrorBoundary>
    </MuiThemeProvider>
  </HelmetProvider>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
