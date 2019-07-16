import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Centered from '../../components/Centered'
import ErrorMessage from '../../components/ErrorMessage'
import LogError from './LogError'

import { UNSPECIFIED_ERROR } from './referenceCodes'

const ShowError = ({
  error,
  reason,
  textOnly,
  shortText,
  ...forwardedProps
}) => {
  const Container = textOnly ? Fragment : Centered
  const containerProps = textOnly ? {} : forwardedProps
  return (
    <Container {...containerProps}>
      <ErrorMessage
        refCode={reason}
        textOnly={textOnly}
        shortText={shortText}
      />
      <LogError error={error} reason={reason} />
    </Container>
  )
}

ShowError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  reason: PropTypes.string,
  shortText: PropTypes.bool,
  textOnly: PropTypes.bool,
}

ShowError.defaultProps = {
  reason: UNSPECIFIED_ERROR,
}

export default ShowError
