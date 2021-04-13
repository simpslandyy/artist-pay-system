import React from 'react'
import clsx from 'clsx'
import { Drawer as MaterialDrawer, IconButton, Divider } from '@material-ui/core'
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 250,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: 250,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }
}))

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  const classes = useStyles()

  return (
    <MaterialDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onClose}>
            {<ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
       { children }
      </MaterialDrawer>
  )
}

export default Drawer