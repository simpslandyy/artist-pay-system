import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Drawer } from '../atoms'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  }
}))

interface NavProps {
  label: string
  items: { key: string, value: string, icon: React.ReactNode }[]
}

const Nav: React.FC<NavProps> = ({ label, items }) => {
  const classes = useStyles()
  const [toggle, setToggle] = React.useState(false)

  return (
    <div className={classes.root}>
      <AppBar open={toggle} label={label} onClick={() => setToggle(true)}/>
      <Drawer open={toggle} onClose={() => setToggle(false)}>
        <List>
          {
            items.map(item => (
              <ListItem button key={item.key}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.value} />
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </div>
  )
}

export default Nav