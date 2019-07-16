import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

export default {
  palette: {
    type: 'light',
    primary: {
      main: '#440459',
    },
    secondary: {
      main: '#509889',
    },
  },
  typography: {
    useNextVariants: true,
    htmlFontSize: 10,
    fontFamilyMonospace: '"Roboto Mono", "Lucida Console", Monaco, monospace',
  },
  state: {
    success: green[500],
    warning: orange[500],
    error: red[500],
  },
  link: {
    primary: {
      color: blue[500],
      textDecoration: 'none',
      '&:hover,&:focus,&:active': {
        color: blue[500],
        textDecoration: 'underline',
      },
      '&:visited': {
        color: blue[800],
      },
    },
    inherit: {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover,&:focus,&:active,&:visited': {
        color: 'inherit',
        textDecoration: 'none',
      },
    },
  },
}
