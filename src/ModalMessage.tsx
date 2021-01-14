/* eslint-disable jsx-a11y/anchor-is-valid */
import './Modal.css';
import React from 'react';
import { IDevice } from './domain/IDevice';

interface IProps {
    device: any;
    onCloseModalMessage: any;
    condition: string;
}

interface IState {
    device: IDevice;
}

export default class ModalMessage extends React.Component<IProps> {

    state: IState = {
        device: this.props.device,
    }

    render() {
        return (
            <div className="ModalMessage-body ">
                <div className="Modal-x">
                    <a onClick={this.props.onCloseModalMessage.bind(this)} href="#">x</a>
                </div>
                <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                    <h2>Someone changed the data:</h2>
                    
                    <div className="Modal-header" style={{ width: '70%' }}>{this.state.device.name} quantity {this.props.condition} by 1</div>
                    
                    
                </div>
                <div>
                   
                    <div style={{ width: '25%', float: 'right' }}>
                        <button onClick={this.props.onCloseModalMessage.bind(this)} style={{ backgroundColor: '#008CBA' }} type="button" className="Modal-button">Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

