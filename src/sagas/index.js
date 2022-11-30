import { all } from "redux-saga/effects";
import sensorDetailsSagas from "./sensorDetailsSagas";
import clientDetailsSagas from "./ClientSagas";

export default function* root() {
  yield all([...sensorDetailsSagas, ...clientDetailsSagas]);
}
