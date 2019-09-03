import React from 'react';
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

    // Component
    class App extends React.Component {
    state = {
        logo: '',
        input: '',
        money: '',
        display: '',
        active: false
    }

    handleClickOnLink = (display) => {
        console.log('e.target.value', display.id);
        this.setState({
            logo: displays[display.id].logo
        })
        this.setState({
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
        console.log('money', e.target.value);
        this.setState({
            money: e.target.value
        })
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    render() {
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
                                    <p><span>USD:</span> {display.usd}</p>
                                    <p><span>UAH:</span> {display.uah}</p>
                                    <p><span>RUB:</span> {display.rub}</p>
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


export default App;
