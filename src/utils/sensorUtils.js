import config from '../config.json'

export const getSensorPhotoURL = (sensor_photo) => new URL(sensor_photo, config.media.baseUrl).href
