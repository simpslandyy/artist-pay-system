import clsx from 'clsx'
import { Chip } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import getCurrencyFormatter from './currency-formatter'

const getColumnConfig = (classes: any) => {
  const currencyFormatter = getCurrencyFormatter('CAD')

  return [
    { field: 'id', headerName: 'ID', filterable: false, width: 100 },
    { field: 'artist', headerName: 'Artist', filterable: false, width: 200},
    { field: 'rate', headerName: 'Rate', type: 'number', filterable: false, width: 120 },
    {
      field: 'streams',
      headerName: 'Streams',
      type: 'number',
      filterable: false,
      width: 140,
    },
    {
      field: 'averagePerMonth',
      headerName: 'Average Payout per Month',
      type: 'number',
      description: 'The average payout amount per month starting from April 2006',
      width: 260,
      filterable: false,
      valueGetter: (params) => (params.getValue('streams') / 180) * params.getValue('rate'),
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value))
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      type: 'number',
      description: 'The total payout amount based on the culmulative stream count and rate since April 2006',
      width: 170,
      filterable: false,
      valueGetter: (params) => params.getValue('rate') * params.getValue('streams'),
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value))
    },
    {
      field: 'paid',
      headerName: 'Status',
      description: 'An artist is paid out if this column is checked',
      width: 200,
      filterable: true,
      renderCell: ({ value }) => (
        value ?  
        <Chip
          variant="outlined"
          size="small"
          label="Paid"
          color="primary"
          classes={{ outlinedPrimary: clsx(classes.paidChip), deleteIconOutlinedColorPrimary: clsx(classes.paidChip) }}
          onDelete={() => {}}
          deleteIcon={<Done />}/> : <> </>)
    }
  ]
}

export default getColumnConfig