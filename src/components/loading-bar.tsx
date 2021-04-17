import React from 'react'
import { GridOverlay } from '@material-ui/data-grid'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    loading: { 
      position: 'absolute',
      top: 0,
      width: '100%' 
    }
  }
))

const LoadingBar: React.FC = () => { 
  const classes = useStyles()

  return (
    <GridOverlay>
      <div className={classes.loading}>
        <LinearProgress />
      </div>
    </GridOverlay>
  )
}

export default LoadingBar