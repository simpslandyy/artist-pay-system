import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 250,
    width: `calc(100% - ${250}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

interface AppBarProps {
  label: string
  open: boolean
  onClick: () => void
}

const AppBar: React.FC<AppBarProps> = ({ label, open, onClick }) => {
  const classes = useStyles()

  return (
    <MaterialAppBar
      position="fixed" 
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start" 
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
            onClick={onClick}>
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              {label}
          </Typography>
        </Toolbar>
    </MaterialAppBar>
  )
}

export default AppBar