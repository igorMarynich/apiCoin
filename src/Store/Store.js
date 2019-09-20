// Store
import {applyMiddleware, createStore} from "redux";
import {reducer} from "../Reducers/reducers";
import {watchFetch} from "../Saga/saga";
import connect from "react-redux/es/connect/connect";
import App from "../Components/App";
import createSagaMiddleware from 'redux-saga';
import {fetchDataAPI} from "../Actions/Actions";

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchFetch);

