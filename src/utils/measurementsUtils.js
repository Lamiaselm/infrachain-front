import moment from 'moment'

const orderMeasurements = (data) =>
  [...data]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map((entry) => ({
      value: entry.total_emf_value,
      name: moment(entry.timestamp).format('YYYY-MM-DD HH:mm'),
    }))

const orderMeasurementsTest = (data) =>
  [...data]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map((entry) => ({
      value: entry.value,
      name: moment(entry.timestamp).format('YYYY-MM-DD HH:mm'),
    }))

export const prepareMeasurements = (data) => {
  // Grab total EMF Values
  const totalEmfValues = []
  for (let i = 0; i < data.length; i++) {
    const entry = data[i]
    if (!totalEmfValues.find((e) => e.id === entry.sensor_measurement.id)) {
      totalEmfValues.push(entry.sensor_measurement)
    }
  }

  return orderMeasurements(totalEmfValues)
}

export const getFrequencies = (data) => {
  const frequencies = []
  for (let i = 0; i < data.length; i++) {
    const entry = data[i]
    const foundedFreqIndex = frequencies.findIndex(
      (e) => e.name === entry.freq.name,
    )

    if (foundedFreqIndex >= 0) {
      frequencies[foundedFreqIndex] = {
        ...frequencies[foundedFreqIndex],
        data: [
          ...frequencies[foundedFreqIndex].data,
          {
            value: entry.value,
            timestamp: entry.sensor_measurement.timestamp,
          },
        ],
      }
    } else {
      frequencies.push({
        ...entry.freq,
        data: [
          {
            value: entry.value,
            timestamp: entry.sensor_measurement.timestamp,
          },
        ],
      })
    }
  }

  for (let index = 0; index < frequencies.length; index++) {
    frequencies[index].data = orderMeasurementsTest(frequencies[index].data)
  }

  return frequencies
}
