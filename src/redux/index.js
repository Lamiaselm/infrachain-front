import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootSaga from "../sagas";
import { reducer as sensorDetailsReducer } from "./sensorDetailsRedux";
import { reducer as clientReducer } from "./clientRedux";
export const store = createReduxStore();
export const persistor = persistStore(store);

function createReduxStore() {
  const reducers = combineReducers({
    sensorDetails: sensorDetailsReducer,
    client: clientReducer,
  });

  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware({});
  middleware.push(sagaMiddleware);
  middleware.push(logger);
  enhancers.push(applyMiddleware(...middleware));

  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  const innerStore = createStore(persistedReducer, compose(...enhancers));

  sagaMiddleware.run(rootSaga);

  return innerStore;
}
