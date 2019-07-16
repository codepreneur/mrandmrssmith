import React from 'react'
import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'

import { setViewportCSSVariables, getViewportDimensions } from './viewportUtils'

class ViewportCSSVariables extends React.PureComponent {
  static propTypes = {
    wait: PropTypes.number,
  }

  static defaultProps = {
    wait: 200,
  }
  constructor(props) {
    super(props)
    this.setVariablesDebounced = debounce(this.setVariables, this.props.wait)
  }

  setVariables = () => setViewportCSSVariables(getViewportDimensions())

  componentDidMount() {
    this.setVariables()
    window.addEventListener('resize', this.setVariablesDebounced)
  }

  componentWillUnmount() {
    this.setVariablesDebounced.cancel()
    window.removeEventListener('resize', this.setVariablesDebounced)
  }

  render() {
    return null
  }
}

export default ViewportCSSVariables
