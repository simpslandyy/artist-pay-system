import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: 36
  },
  title: {
    flexGrow: 1
  },
  nav: {
    marginBottom: "5rem"
  }
}))

interface AppBarProps {
  label: string
}

const AppBar: React.FC<AppBarProps> = ({ label }) => {
  const classes = useStyles()

  return (
    <MaterialAppBar
      className={classes.nav}
      position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
              {label}
          </Typography>
        </Toolbar>
    </MaterialAppBar>
  )
}

export default AppBar