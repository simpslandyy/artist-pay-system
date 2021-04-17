import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red';

const BACKGROUND_COLOR = '#f0f8ff'

const theme = createMuiTheme({
  palette: {
    background: {
      default: BACKGROUND_COLOR
    },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    }
  }
})

export default theme
