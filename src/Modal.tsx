/* eslint-disable jsx-a11y/anchor-is-valid */
import './Modal.css';
import React from 'react';
import { IDevice } from './domain/IDevice';

interface IProps {
    device: any;
    onCloseModal: any;
    onAddItem: any;
    onRemoveItem: any;
    count: number;
}

interface IState {
    device: IDevice;
}

export default class Modal extends React.Component<IProps> {

    state: IState = {
        device: this.props.device,
    }

    render() {
        return (
            <div className="Modal-body">
                <div className="Modal-x">
                    <a onClick={this.props.onCloseModal.bind(this)} href="#">x</a>
                </div>
                <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                    <div className="Modal-header" style={{ width: '5%' }}>{this.state.device.id}</div>
                    <div className="Modal-header" style={{ width: '70%' }}>{this.state.device.name}</div>
                    <div className="Modal-header" style={{ width: '15%' }}>${this.state.device.money}</div>
                    <div className="Modal-header" style={{ width: '8%', border: 'solid 1px', textAlign: 'center' }}>{this.state.device.count}</div>
                </div>
                <div>
                    <div className="Modal-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <div style={{ width: '25%', float: 'right' }}>
                        <button onClick={this.props.onAddItem.bind(this, this.state.device.id)} style={{ backgroundColor: '#4CAF50' }} type="button" className="Modal-button">add to cart</button>
                        <button onClick={this.props.onRemoveItem.bind(this, this.state.device.id)} style={{ backgroundColor: '#c0b62c' }} type="button" className="Modal-button">remove from cart</button>
                        <p>this item in cart: {this.props.count}</p>
                        <button onClick={this.props.onCloseModal.bind(this)} style={{ backgroundColor: '#008CBA' }} type="button" className="Modal-button">Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

