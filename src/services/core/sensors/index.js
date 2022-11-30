import moment from 'moment'
import create from '../../create'
import endpoints from './endpoints'

export async function getSensors() {
  const api = create()
  const response = await api.get(endpoints.getSensors())
  return response
}

export async function getMobileSensors() {
  const api = create()
  const response = await api.get(endpoints.getMobileSensors())
  return response
}

export async function getSensorDetails(id) {
  const api = create()
  const response = await api.get(endpoints.getSensorDetails(id))
  return response
}

export async function getSensorMeasurements({ id, start_date, end_date }) {
  const api = create()
  const response = await api.get(endpoints.getSensorMeasurements(), {
    sensor_id: id,
    start_date,
    end_date,
  })
  return response
}

export async function getMobileSensorMeasurements({ sensor_ids }) {
  const api = create()
  const response = await api.get(endpoints.getMobileSensorMeasurements(), {
    sensor_ids: sensor_ids.join(','),
  })
  return response
}
