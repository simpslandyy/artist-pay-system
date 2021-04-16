const getCurrencyFormatter = (currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

  return formatter
}

export default getCurrencyFormatter