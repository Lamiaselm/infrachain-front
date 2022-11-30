import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: 0,
  consumptionData: 0,
  fetching: false,
  fetched: false,
  error: null,
  creating: false,
  generate: false,
};

export const slice = createSlice({
  name: "client",
  initialState,
  reducers: {
    getBalanceRequest: (state) => {
      state.fetched = false;
    },
    getBalanceSuccess: (state, action) => {
      state.fetched = true;
      state.error = null;
      state.data = action.payload;
    },
    getBalanceFailure: (state, action) => {
      state.fetched = false;
      state.error = action.payload;
    },
    getConsumptionRequest: (state) => {
      state.fetched = false;
    },
    getConsumptionSuccess: (state, action) => {
      state.fetched = true;
      state.error = null;
      state.consumptionData = action.payload;
    },
    getConsumptionFailure: (state, action) => {
      state.fetched = false;
      state.error = action.payload;
    },
    claimRewardRequest: (state) => {
      state.creating = true;
    },
    claimRewardSuccess: (state) => {
      state.creating = false;
    },
    claimRewardFailure: (state, action) => {
      state.creating = false;
      state.error = action.payload;
    },
    generateTokenRequest: (state) => {
      state.generate = true;
    },
    generateTokenSuccess: (state) => {
      state.generate = false;
    },
    generateTokenFailure: (state, action) => {
      state.generate = false;
      state.error = action.payload;
    },
  },
});

export const clientSelectors = {
  getData: (state) => state.client.data,
  creating: (state) => state.client.creating,
  generate: (state) => state.client.generate,
  getDataConsumption: (state) => state.client.consumptionData,
  getConsumpData: (state) => state.client.consumptionData,
  fetched: (state) => state.client.fetched,
  getError: (state) => state.client.error,
};

export default slice.actions;
export const reducer = slice.reducer;
