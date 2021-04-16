import React from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Delete } from '@material-ui/icons'

interface TableHeaderProps {
  showMenu: boolean
  numberSelected: number
  title: string
  onDelete: () => void
  additionalMenuButtons?: React.ReactNode
}

const useStyles =  makeStyles(() => ({
  headerRoot: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconMenu: {
    display: 'flex'
  }
}))

const TableHeader: React.FC<TableHeaderProps&any> = ({ showMenu, numberSelected, title, onDelete, additionalMenuButtons }) => {
  const classes = useStyles()

  return (
    <Toolbar className={classes.headerRoot}>
      { showMenu ? 
          <Typography variant='h6'>  { numberSelected } selected </Typography> : 
          <Typography variant='h6'> { title } </Typography>}
      { showMenu && 
      <div className={classes.iconMenu}>
        { additionalMenuButtons }
        <Tooltip title='Delete Selected'>
          <IconButton onClick={onDelete}>
            <Delete/>
          </IconButton>
        </Tooltip>
      </div>
      } 
    </Toolbar>
  )
}

export default TableHeader