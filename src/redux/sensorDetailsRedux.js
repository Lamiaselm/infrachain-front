import { createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

const initialState = {
  data: {},
  measurements: [],
  fetching: false,
  fetched: false,
  error: null,
  fetchingM: false,
  fetchedM: false,
}

export const slice = createSlice({
  name: 'sensorDetails',
  initialState,
  reducers: {
    getSensorDetailsRequest: (state) => {
      state.fetched = false
      state.fetching = true
      state.data = {}
    },
    getSensorDetailsSuccess: (state, action) => {
      state.fetching = false
      state.fetched = true
      state.error = null
      state.data = action.payload
    },
    getSensorDetailsFailure: (state, action) => {
      state.fetching = false
      state.fetched = false
      state.error = action.payload
    },
    getSensorMeasurementsRequest: (state) => {
      state.fetchedM = false
      state.fetchingM = true
    },
    getSensorMeasurementsSuccess: (state, action) => {
      state.fetchingM = false
      state.fetchedM = true
      state.error = null
      state.measurements = action.payload
    },
    getSensorMeasurementsFailure: (state, action) => {
      state.fetchingM = false
      state.fetchedM = false
      state.error = action.payload
    },
  },
})

export const sensorDetailsSelectors = {
  getData: (state) => (!isEmpty(state.sensorDetails.data)
    ? state.sensorDetails.data
    : initialState.data),
  getMeasurements: (state) => (Array.isArray(state.sensorDetails.measurements)
    ? state.sensorDetails.measurements
    : initialState.measurements),
  fetching: (state) => state.sensorDetails.fetching,
  fetchingM: (state) => state.sensorDetails.fetchingM,
  fetched: (state) => state.sensorDetails.fetched,
  getError: (state) => state.sensorDetails.error,
}

export default slice.actions
export const reducer = slice.reducer
