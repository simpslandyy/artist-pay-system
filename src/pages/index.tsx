import React from 'react'
import { Container, Paper } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, Theme } from '@material-ui/core/styles'

import axios from 'axios'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  table: {
    height: 400
  },
  flexContainer: {
    justifyContent: 'flex-end'
  }
}))

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
})

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'artist', headerName: 'Artist', width: 130 },
  { field: 'rate', headerName: 'Rate', type: 'number', width: 150 },
  {
    field: 'streams',
    headerName: 'Streams',
    type: 'number',
    width: 180,
  },
  {
    field: 'totalAmount',
    headerName: 'Total Amount',
    type: 'number',
    description: 'This column has a value getter and is not sortable.',
    width: 180,
    valueGetter: (params) => params.getValue('rate') * params.getValue('streams'),
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value))
  }
]

const Home: React.FC = () => {
  const classes = useStyles() 
  const [data, setData] = React.useState(null)
  const [selectedRows, setSelected] = React.useState([]);

  React.useEffect(() => {
    axios.get('/api/v1/roster').then((resp) => {
      const { data } = resp?.data
      setData(data)
    })
  }, [])
  
  const handleDelete = () => {
    // if (!selectedRows) show an error
    console.log(`Deleting the following ${JSON.stringify(selectedRows)}`)
  }

  return (
    <Container>
      <Paper>
       <div className={classes.table}>
        { data && <DataGrid 
          rows={data}
          columns={columns}
          pageSize={5}
          sortModel={[
            {
              field: 'id',
              sort: 'asc',
            },
            {
              field: 'rate',
              sort: 'asc',
            },
            {
              field: 'streams',
              sort: 'asc',
            },
            {
              field: 'totalAmount',
              sort: 'asc',
            },
          ]}
          checkboxSelection
          onSelectionModelChange={({ selectionModel }) => setSelected(selectionModel)}
          selectionModel={selectedRows}
          /> }
       </div>
      </Paper>
    </Container>
  )
}


export default Home