/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.css';
import Device from './components/Devices';
import { IDevice } from './domain/IDevice';
import Modal from './Modal';
import ModalMessage from './ModalMessage';
import { DeviceApi } from './services/DeviceApi';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080', {
    transports: ['websocket']
  });


export default class App extends React.Component {
    state = {
        showModal: false,
        showMessage: false,
        device: null,
        devices: [],
        store: [],
        count: 0,
        updatedDevice: null,
        condition: '',
        id: 0
    }

    async componentDidMount() {
        socket.on('update', (data: IDevice, condition: string) => {
            this.setState({ 
                showMessage: true,
                updatedDevice: data,
                condition
            })
        });
        const data = await DeviceApi.getAll();
        this.setState({ devices: data })
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
            count,
            id
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
            socket.emit('serverupdate', data, 'decreased')
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
            socket.emit('serverupdate', data, 'increased')
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

    async closeModalMessage(){
        const data = await DeviceApi.getAll();
        if(this.state.showModal){
            const data1 = await DeviceApi.getById(this.state.id);
            this.setState({
                device: data1,
                showModal: false
            })
            this.setState({
                showModal: true
            })
        }
        this.setState({
            devices: data,
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
                        device={this.state.updatedDevice}
                        condition={this.state.condition}
                        onCloseModalMessage={this.closeModalMessage.bind(this)}
                         />
                    : null}
            </div>
        );
    }
}