import React from 'react'
import { TableHeader, Alert } from '../components'
import { Container, IconButton, Paper, Tooltip } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles'
import { AttachMoney, MoneyOff } from '@material-ui/icons'
import { getColumnConfig } from '../utils'

import axios from 'axios'

const useStyles = makeStyles(() => ({
  tableRoot: {
    display: 'flex'
  },
  table: {
    height: 400,
    width: '100%'
  },
  flexContainer: {
    justifyContent: 'flex-end'
  },
  paidChip: {
    color: 'green',
    borderColor: 'green'
  }
}))


const Home: React.FC = () => {
  const classes = useStyles() 

  const [data, setData] = React.useState(null)
  const [selectedRows, setSelected] = React.useState([])
  const [showAlert, setAlert] = React.useState({ severity: '', message: ''})

  /** Column configuration for the table */
  const columns = getColumnConfig(classes)

  /**
   * Fetch data from the server
   */
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/roster')
      const { data } = response?.data
      setData(data)
    } catch (err) {
      setAlert({severity: 'error', message: `Unable to fetch records. Please try again later.`})
    }
  }

  /** 
   * Handle when user selects delete on selected items
   */
  const handleDelete = async () => {
    try {
      await axios.patch(`/api/v1/roster/deleteBulk`, { ids: selectedRows })
      setAlert({severity: 'success', message: `Successfully deleted ${selectedRows.length} records`})
      console.log(`Deleting the following ${JSON.stringify(selectedRows)}`)
    } catch (err) {
      setAlert({severity: 'error', message: `Unable to delete ${selectedRows.length} records. Please try again later.`})
    }
  }

  /**
   * Handle when user toggles between the payout and cancel payment on the list of selected items
   * @param type 'cancel' | 'payout'
   */
  const handleUpdate = async (type: 'cancel' | 'payout') => {
    const isPaid = type === 'payout'
    try {
      await axios.patch(`/api/v1/roster/updatePayment?isPaid=${isPaid}`, { ids: selectedRows })
      await fetchData()
      setAlert({severity: 'success', message: `Successfully updated ${selectedRows.length} records`})
      console.log(`Updating the following ${JSON.stringify(selectedRows)}`)
    } catch(err) {
      setAlert({severity: 'error', message: `Unable to update ${selectedRows.length} records. Please try again later.`})
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])


  return (
    <Container className={classes.tableRoot}>
      { showAlert.severity && <Alert 
        show={!!showAlert}
        onClose={() => setAlert({severity: '', message: ''})}
        type={showAlert.severity as any}
        message={showAlert.message} /> }

      <Paper className={classes.table}>
        <TableHeader 
          title="Roster"
          numberSelected={selectedRows.length}
          showMenu={selectedRows.length > 0}
          onDelete={handleDelete}
          additionalMenuButtons={
            <>
            <Tooltip title='Pay Selected'>
              <IconButton onClick={() => handleUpdate('payout')}>
                <AttachMoney/>
              </IconButton>
            </Tooltip>
             <Tooltip title='Cancel Payment'>
             <IconButton onClick={() => handleUpdate('cancel')}>
               <MoneyOff/>
             </IconButton>
           </Tooltip>
           </>
          }
          />
        { data && <DataGrid 
          rows={data}
          columns={columns}
          pageSize={5}
          sortModel={[
            { field: 'id', sort: 'asc' },
            { field: 'artist', sort: 'asc'  },
            { field: 'rate', sort: 'asc'  },
            { field: 'streams', sort: 'asc'  },
            { field: 'averagePerMonth', sort: 'asc' },
            { field: 'totalAmount', sort: 'asc' },
            { field: 'paid', sort: 'asc' }
          ]}
          checkboxSelection
          onSelectionModelChange={({ selectionModel }) => setSelected(selectionModel)}
          selectionModel={selectedRows}
          /> }
      </Paper>
    </Container>
  )
}


export default Home