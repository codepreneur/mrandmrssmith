import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'

import { injectRefCodeIntoError } from './loggingUtils'

import { UNSPECIFIED_ERROR } from './referenceCodes'

class LogError extends React.Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
    reason: PropTypes.string,
  }

  static defaultProps = {
    reason: UNSPECIFIED_ERROR,
  }

  componentDidMount() {
    const { error, reason } = this.props
    injectRefCodeIntoError(reason, error)

    if (window.newrelic && isFunction(window.newrelic.noticeError)) {
      window.newrelic.noticeError(error)
    }
    // eslint-disable-next-line
    console.error(error)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}

export default LogError
