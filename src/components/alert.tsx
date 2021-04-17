import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

interface AlertProps {
  show: boolean
  onClose: () => void
  type: 'error' | 'success'
  message: string
}

const Alert: React.FC<AlertProps> = ({ show, onClose, type, message }) => {
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}} autoHideDuration={5000} open={show} onClose={onClose}>
      <MuiAlert onClose={onClose} severity={type}>
        { message }
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert