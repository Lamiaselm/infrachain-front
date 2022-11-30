import { message } from 'antd'
import { put, takeLeading, call } from 'redux-saga/effects'

import sensorDetailsActions from '../redux/sensorDetailsRedux'
import api from '../services'

function* getSensorDetailsRequest(action) {
  const response = yield call(api.sensors.getSensorDetails, action.payload.id)
  if (response.ok === true) {
    yield put(sensorDetailsActions.getSensorDetailsSuccess(response.data))
  } else {
    message.error(response.data.message)
    yield put(sensorDetailsActions.getSensorDetailsFailure(response.data))
  }
}

function* getSensorMeasurementsRequest(action) {
  const response = yield call(api.sensors.getSensorMeasurements, action.payload)
  if (response.ok === true) {
    yield put(sensorDetailsActions.getSensorMeasurementsSuccess(response.data))
  } else {
    message.error(response.data.message)
    yield put(sensorDetailsActions.getSensorMeasurementsFailure(response.data))
  }
}
// Watchers.
export default [
  takeLeading(
    sensorDetailsActions.getSensorDetailsRequest,
    getSensorDetailsRequest,
  ),
  takeLeading(
    sensorDetailsActions.getSensorMeasurementsRequest,
    getSensorMeasurementsRequest,
  ),
]
