import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import './App.css';

const displays = [
    {
        img: 'https://endotech.io/img/coinicon/BTC.png',
        logo: 'BTC',
        usd: 6800,
        uah: 150000,
        rub: 340000,
        id: 0
    },
    {
        img: 'https://endotech.io/img/coinicon/ETH.png',
        logo: 'ETH',
        usd: 250,
        uah: 7400,
        rub: 16000,
        id: 1
    },
    {
        img: 'https://endotech.io/img/coinicon/XRP.png',
        logo: 'XRP',
        usd: 0.25,
        uah: 7.0231,
        rub: 17.228,
        id: 2
    }
];

// Reducer
const initialState = {
    payload: '',
    loading: false,
    error: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED':
            return {
                payload: '',
                loading: true,
                error: false,
            };
        case 'REQUESTED_SUCCEEDED':
            return {
                payload: action.payload,
                loading: false,
                error: false,
            };
        case 'REQUESTED_FAILED':
            return {
                payload: '',
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

// Action Creators
const request = () => {
    return { type: 'REQUESTED' }
};

const requestDogSuccess = (data) => {
    return { type: 'REQUESTED_SUCCEEDED', payload: data }
};


const requestDogError = () => {
    return { type: 'REQUESTED_FAILED' }
};

const fetchDog = () => {
    return { type: 'FETCHED' }
};

// Sagas
function* watchFetch() {
    yield takeEvery('FETCHED', fetchAsync);
}

function* fetchAsync() {
    try {
        yield put(request());
        const data = yield call(() => {
                return fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
                    .then(res => res.json())
                    .then (myData => {
                        return myData;
                    })
            }
        );
        yield put(requestDogSuccess(data));
    } catch (error) {
        yield put(requestDogError());
    }
}




// Component
class App extends React.Component {

    state = {
        logo: '',
        input: '',
        money: '',
        display: '',
        active: false
    }

    componentDidMount() {
        this.props.dispatch(fetchDog())
    }

    handleClickOnLink = (display) => {
        console.log('e.target.value', display.id);
        this.setState({
            logo: displays[display.id].logo,
            display: displays[display.id]
        })
    }

    onInputChange = (e) => {
        console.log('value', e.target.value);
        this.setState({
            input: e.target.value
        })
    }

    changeMoney = (e) => {
        const currentState = this.state.active;
        console.log('money', e.target.value);
        this.setState({
            money: e.target.value,
            active: !currentState
        })
    }

    render() {
        const myObj = {};
        Array.from(this.props.payload).map(ur => {
            myObj[ur.ccy] = ur.sale;
            console.log('myObj', myObj);
            return myObj;
        });

        displays.map(display => {
            display.uah = (myObj.BTC * myObj.USD).toFixed(2);
            display.usd = parseFloat(myObj.BTC).toFixed(2);
            display.rub = (myObj.BTC * (myObj.USD / myObj.RUR)).toFixed(2);
        });

        return (
            <div className="App">
                <div className='info'>
                    { displays.map ((display) => (
                        <div className='container' onClick={() => this.handleClickOnLink(display)} key ={display.id}>
                            <div className='left'>
                                <div className='logo'>
                                    <img src={display.img} />
                                    <p>{display.logo}</p>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='text'>
                                    <p>UAH : {display.uah === 'NaN' ? "Loading..." : display.uah}</p>
                                    <p>USD : {display.usd === 'NaN' ? "Loading..." : display.usd}</p>
                                    <p>RUB : {display.rub === 'NaN' ? "Loading..." : display.rub} </p>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className='selected'>
                    <p>Selected coin: {this.state.logo}</p>
                </div>
                <div className='inputValue'>
                    <div className='inputValueText'><p>Volume:</p></div>
                    <div><input type="number" size="60"  onChange={this.onInputChange}/></div>
                </div>
                <div className="money">
                    <button className={this.state.money === 'UAH' ? 'choice': 'no_choice'} onClick={this.changeMoney} value='UAH'>UAH</button>
                    <button className={this.state.money === 'USD' ? 'choice': 'no_choice'} onClick={this.changeMoney} value='USD'>USD</button>
                    <button className={this.state.money === 'RUB' ? 'choice': 'no_choice'} onClick={this.changeMoney} value='RUB'>RUB</button>
                </div>
                <div className='result'>
                    {this.state.input === '' || this.state.logo === '' || this.state.display === '' || this.state.money === '' ? <div></div> : <p>
                        <span>{this.state.input} {this.state.logo}</span> will be <span>{this.state.input * this.state.display[this.state.money.toLowerCase()]}</span> in <span>{this.state.money}</span>
                    </p>}
                </div>
            </div>

        );
    }


}

// Store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchFetch);

const ConnectedApp = connect((state) => {
    console.log(state);
    return state;
})(App);

// Container component
ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);