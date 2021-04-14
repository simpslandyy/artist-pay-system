import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar } from '../atoms'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  }
}))

interface AppWrapperProps {
  label: string
  items: { key: string, value: string, icon: React.ReactNode }[]
  children: React.ReactNode
}

const AppWrapper: React.FC<AppWrapperProps> = ({ label, items, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar label={label}/>
      { children }
    </div>
  )
}

export default AppWrapper