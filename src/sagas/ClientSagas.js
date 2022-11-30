import { message } from "antd";
import { put, takeLeading, call } from "redux-saga/effects";

import clientActions from "../redux/clientRedux";
import api from "../services";

function* getBalance(action) {
  const response = yield call(api.client.getBalance, action.payload.data);
  console.log(action.payload.data);
  if (response.ok === true) {
    yield put(clientActions.getBalanceSuccess(response.data));
    yield call(action.payload.onSuccess, {
      data: response.data,
    });
  } else {
    // message.error(response.data.message);
    yield put(clientActions.getBalanceFailure(response.data));
    yield call(action.payload.onFail);
  }
}
function* getConsumption(action) {
  const response = yield call(api.client.getConsumption, action.payload.data);
  if (response.ok === true) {
    yield put(clientActions.getConsumptionSuccess(response.data));
    yield call(action.payload.onSuccess, {
      data: response.data,
    });
  } else {
    // message.error(response.data.message);
    yield put(clientActions.getConsumptionFailure(response.data));
  }
}
function* claimReward(action) {
  const { data, onSuccess, onFail } = action.payload;
  console.log("saga", action.payload.data);
  // TODO: Replace with Admin API
  const response = yield call(api.client.claimReward, action.payload.data);
  if (response.ok === true) {
    yield put(clientActions.claimRewardSuccess(response.data));
    yield call(action.payload.onSuccess, {
      data: response.data,
    });
    yield put(clientActions.getBalanceRequest());
  } else {
    // message.error(response.data.message);
    yield put(clientActions.claimRewardFailure(response.data));
    yield call(onFail);
  }
}
function* generateToken(action) {
  const { data, onSuccess, onFail } = action.payload;
  console.log("saga", action.payload.data);
  // TODO: Replace with Admin API
  const response = yield call(api.client.generateToken, action.payload.data);
  if (response.ok === true) {
    yield put(clientActions.generateTokenSuccess(response.data));
    yield call(action.payload.onSuccess, {
      data: response.data,
    });
  } else {
    // message.error(response.data.message);
    yield put(clientActions.generateTokenFailure(response.data));
    yield call(onFail);
  }
}

// Watchers.
export default [
  takeLeading(clientActions.getBalanceRequest, getBalance),
  takeLeading(clientActions.generateTokenRequest, generateToken),
  takeLeading(clientActions.getConsumptionRequest, getConsumption),
  takeLeading(clientActions.claimRewardRequest, claimReward),
];
