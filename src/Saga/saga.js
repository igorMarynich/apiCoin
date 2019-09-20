// Sagas
import { takeEvery, put, call } from 'redux-saga/effects';
import {request, requestDogSuccess, requestDogError} from '../Actions/Actions';
import axios from 'axios';

export function* watchFetch() {
    yield takeEvery('FETCHED', fetchAsync);
}

export function* fetchAsync() {

    try {
        yield put(request());
        const {data} = yield call(
            axios.get,'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR,RUB'
        );
        console.log('data', data);

        yield put(requestDogSuccess(data));
    } catch (error) {
        yield put(requestDogError());
    }
}