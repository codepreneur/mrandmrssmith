import React from 'react'
import PropTypes from 'prop-types'

import { identify } from './identifyErrorReason'

import ShowError from './ShowError'

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    defaultReason: PropTypes.string,
    fullScreenHeight: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      reason: null,
    }
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error: error,
      reason: identify(error) || this.props.defaultReason,
    })
  }

  render() {
    const { fullScreenHeight, children } = this.props
    const { hasError, error, reason } = this.state
    return hasError ? (
      <ShowError
        error={error}
        reason={reason}
        style={fullScreenHeight ? { height: '100vh' } : undefined}
      />
    ) : (
      children
    )
  }
}

export default ErrorBoundary
