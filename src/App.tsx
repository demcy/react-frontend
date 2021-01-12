/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { NumberLiteralType } from 'typescript';
import './App.css';
import Device from './components/Devices';
import { IDevice } from './domain/IDevice';
import Modal from './Modal';
import ModalMessage from './ModalMessage';
import { DeviceApi } from './services/DeviceApi';


export default class App extends React.Component {
    state = {
        showModal: false,
        showMessage: false,
        device: null,
        devices: [],
        store: [],
        count: 0
    }

    async tick() {
        const data = await DeviceApi.getAll();
        if(JSON.stringify(data) !== JSON.stringify(this.state.devices)){
            console.log(JSON.stringify(data))
            console.log(JSON.stringify(this.state.devices))
            this.setState((state) => ({ 
                showModal: false,
                showMessage: true 
            }))
        }
        // if (data.every((v,i) => v === this.state.devices[i])){
        //     console.log('false')
        // this.setState({ count: this.state.count + 1 })
        // }
      }

    async componentDidMount() {
        const data = await DeviceApi.getAll();
        this.setState({ devices: data })
        const interval = setInterval(() => this.tick(), 5000);
    }

   

    async showModal(id: number) {
        const data = await DeviceApi.getById(id);
        const count = this.deviceCount(data.name)
        if (this.state.showModal) {
            this.setState({
                showModal: false
            })
        }
        this.setState({
            device: data,
            showModal: true,
            count
        })
    }

    deviceCount(name: String) {
        console.log('name' + name)
        console.log('nameaa' + this.state.store.length)
        const devices = this.state.store.filter(function (deviceName: String) {
            if (deviceName === name) {
                console.log('found')
                return deviceName
            }
        });
        console.log('count' + devices.length)
        return devices.length;
    }

    async addItem(id: number) {
        const data = await DeviceApi.getById(id);
        if (data.count > 0) {
            data.count = data.count - 1;
            const data2 = await DeviceApi.updateById(id, data);
            const data3 = await DeviceApi.getAll();
            const store: String[] = [...this.state.store];
            store.push(data2.name);
            this.setState({
                store
            })
            const count = this.deviceCount(data2.name)
            if (this.state.showModal) {
                this.setState({
                    showModal: false
                })
            }
            this.setState({
                devices: data3,
                device: data2,
                store,
                showModal: true,
                count
            })
        }
    }

    async removeItem(id: number) {

        const data = await DeviceApi.getById(id);
        const count = this.deviceCount(data.name)
        if (count > 0) {
            const store: String[] = [...this.state.store];
            const index = store.indexOf(data.name)
            store.splice(index, 1)
            this.setState({
                store
            })
            data.count = data.count + 1;
            const data2 = await DeviceApi.updateById(id, data);
            const data3 = await DeviceApi.getAll();
            console.log(data.name)
            const count = this.deviceCount(data.name)
            if (this.state.showModal) {
                this.setState({
                    showModal: false
                })
            }
            this.setState({
                devices: data3,
                device: data2,
                store,
                showModal: true,
                count
            })
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    closeModalMessage = () => {
        this.setState({
            showMessage: false
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <h4 className="App-heading">Device Shop</h4>
                    </div>
                    <div style={{ top: '5%', right: '5%', position: 'absolute' }}>Total in cart: {this.state.store.length}</div>
                </header>
                <Device devices={this.state.devices} onShowModal={this.showModal.bind(this)} />
                {this.state.showModal
                    ? <Modal
                        device={this.state.device}
                        count={this.state.count}
                        onCloseModal={this.closeModal.bind(this)}
                        onAddItem={this.addItem.bind(this)}
                        onRemoveItem={this.removeItem.bind(this)} />
                    : null}
                {this.state.showMessage
                    ? <ModalMessage
                        device={this.state.device}
                        count={this.state.count}
                        onCloseModalMessage={this.closeModalMessage.bind(this)}
                         />
                    : null}
            </div>
        );
    }
}