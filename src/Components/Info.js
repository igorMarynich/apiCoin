import React from 'react';
import {displays} from "../arrayDisplays/arrayDisplays";


export default class Info extends React.Component {

    render() {
        return(
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
        )
    }
}