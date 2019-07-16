import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'

import { withStyles } from '@material-ui/core/styles'
import { interleaveTextWithComponent } from '../../utils/reactHelpers'

import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'

const styles = (theme) => {
  const unit = getOr(0, ['spacing', 'unit'], theme)
  const errorColor = get(['palette', 'error', 'main'], theme)
  return {
    container: {
      marginLeft: unit,
      marginRight: unit * 3,
      display: 'flex',
    },
    icon: {
      ...getOr({}, ['typography', 'h4'], theme),
      color: errorColor,
      marginRight: unit * 2,
    },
    refCode: {
      color: get(['palette', 'text', 'secondary'], theme),
    },
    refCodeGutter: {
      marginTop: '1em',
    },
    title: {
      color: errorColor,
    },
  }
}

const text = {
  title: 'We are sorry, something went wrong.',
  moreInfo: [
    'Please, refresh your browser and try again.',
    'If the problem persists, please contact tech support.',
  ],
  refCode: 'Reference code:',
}

const ErrorMessage = ({ refCode, textOnly, shortText, classes }) =>
  textOnly ? (
    <Fragment>
      <Typography
        variant="body2"
        component="span"
        gutterBottom={Boolean(refCode)}
      >
        <strong className={classes.title}>{text.title}</strong>
        {!shortText && (
          <Fragment>
            <br />
            {text.moreInfo.join(' ')}
          </Fragment>
        )}
      </Typography>
      {refCode && (
        <Typography
          className={classes.refCode}
          variant="caption"
          component="span"
        >
          {text.refCode} <strong>{refCode}</strong>
        </Typography>
      )}
    </Fragment>
  ) : (
    <section className={classes.container}>
      <WarningIcon className={classes.icon} />
      <div>
        <Typography variant="h6" gutterBottom>
          {text.title}
        </Typography>
        {!shortText && (
          <Typography variant="body2" gutterBottom={Boolean(refCode)}>
            {interleaveTextWithComponent('br', text.moreInfo)}
          </Typography>
        )}
        {refCode && (
          <Typography
            className={clsx(classes.refCode, classes.refCodeGutter)}
            variant="caption"
          >
            {text.refCode} <strong>{refCode}</strong>
          </Typography>
        )}
      </div>
    </section>
  )

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  refCode: PropTypes.string,
  shortText: PropTypes.bool,
  textOnly: PropTypes.bool,
}

export default withStyles(styles)(ErrorMessage)
