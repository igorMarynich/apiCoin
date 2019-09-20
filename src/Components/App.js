import React, {Component} from 'react';
import '../App.css';
import {displays} from '../arrayDisplays/arrayDisplays';
import {fetchDataAPI} from '../Actions/Actions';
import {connect} from 'react-redux';


class App extends Component {

    state = {
        logo: '',
        input: '',
        money: '',
        display: '',
        active: false,
        dataAPI: ''
    }

    componentDidMount() {
        this.props.displayAPI();
    }

    handleClickOnLink = (display) => {
        // console.log('e.target.value', display.id);
        this.setState(() => {
            return {
                logo: displays[display.id].logo,
                display: displays[display.id]
                }
            }
        )
    }

    onInputChange = (e) => {
        // console.log('value', e.target.value);
        this.setState({
               input: e.target.value
        })
    }

    createChangeMoney = (name) => () => {
        const currentState = this.state.active;
        // console.log('money', name);
        this.setState(() => {
            return {
                money: name,
                active: !currentState
            }
        })
    }

    render() {
        const myObj  = this.props.dataAPI &&  this.props.dataAPI.reduce((acc,  item) => {
            acc[item.ccy] = item.sale;
            return acc;
        }, {});
        console.log('myObj', myObj);

        // const newDisplays =  displays.map(display => {
        //     display.uah = (myObj.BTC * myObj.USD).toFixed(2);
        //     display.usd = parseFloat(myObj.BTC).toFixed(2);
        //     display.rub = (myObj.BTC * (myObj.USD / myObj.RUR)).toFixed(2);
        // });


        // console.log('newDisplays', newDisplays);
        // console.log('displays', displays);

        const { money, input, logo,  display} = this.state;
        const shouldRenderFinalResult = [money, input, logo,  display].every(item => !!item );
        // console.log('shouldRenderFinalResult', shouldRenderFinalResult);

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
                                    {true  && <p>UAH : {display.uah === 'NaN' ? "Loading..." : display.uah}</p>}
                                    {true  && <p>USD : {display.usd === 'NaN' ? "Loading..." : display.usd}</p>}
                                    {true  && <p>RUB : {display.rub === 'NaN' ? "Loading..." : display.rub}</p>}
                                    {/*<p>USD : {display.usd === 'NaN' ? "Loading..." : display.usd}</p>*/}
                                    {/*<p>RUB : {display.rub === 'NaN' ? "Loading..." : display.rub} </p>*/}
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
                    <button className={this.state.money === 'UAH' ? 'choice': 'no_choice'} onClick={this.createChangeMoney('UAH')} >UAH</button>
                    <button className={this.state.money === 'USD' ? 'choice': 'no_choice'} onClick={this.createChangeMoney('USD')} >USD</button>
                    <button className={this.state.money === 'RUB' ? 'choice': 'no_choice'} onClick={this.createChangeMoney('RUB')} >RUB</button>
                </div>
                <div className='result'>
                    {shouldRenderFinalResult ? <p>
                            <span>{this.state.input} {this.state.logo}</span> will be <span>{this.state.input * this.state.display[this.state.money.toLowerCase()]}</span> in <span>{this.state.money}</span>
                        </p> : <div></div>}
                </div>
            </div>
        );

    }


}



const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        initialState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayAPI : () => dispatch(fetchDataAPI())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

