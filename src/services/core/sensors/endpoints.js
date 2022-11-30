export default {
  getSensors: () => '/sensors/',
  getMobileSensors: () => '/sensors/mobile/',
  getSensorDetails: (id) => `/sensors/${id}/`,
  getSensorMeasurements: () => '/measurements/',
  getMobileSensorMeasurements: () => '/measurements_mobile/',
}
