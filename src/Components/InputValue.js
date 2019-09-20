import React from 'react';

export default class Info extends React.Component {
    render() {
        return(
            <div>
                <div className='selected'>
                    <p>Selected coin: {this.props.logo}</p>
                </div>
                <div className='inputValue'>
                    <div className='inputValueText'><p>Volume:</p></div>
                    <div><input type="number" size="60"  onChange={this.onInputChange}/></div>
                </div>
            </div>
        )
    }
}