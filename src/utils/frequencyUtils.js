export const prepareFrequenciesForGraph = (data) => {
  const result = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const start = parseInt(item.band.slice(0, -4).split('-')[0].replace('.', ''))
    const end = parseInt(item.band.slice(0, -4).split('-')[1].replace('.', ''))
    for (let i = start; i < end; i++) {
      result.push({
        freq: i,
        name: item.band.replace('.', ''),
        value: 1,
      })
    }
  }
  return result
}
