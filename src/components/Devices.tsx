/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { IDevice } from "../domain/IDevice";
import './Device.css';

interface IProps {
    onShowModal: any,
    devices: IDevice[]
}

// interface IState {
//     devices: IDevice[];
// }

export default class Device extends React.Component<IProps> {

    // state: IState = {
    //     //devices: [],
    //     devices: this.props.devices
    // }

    // async componentDidMount() {
    //     this.setState({
    //         devices: this.props.devices
    //     })
    //     //console.log(this.state.devices[0].name)
    // }

   
    render() {
        return (
            <div>
                <table >
                    <tbody>
                        {this.props.devices.map(device => (
                            <tr key={device.id}>
                                <td style={{ width: '90%', paddingLeft: '5%' }}>
                                    <a onClick={this.props.onShowModal.bind(this, device.id)} href="#">{device.name}</a>
                                </td>
                                <td style={{ textAlign: 'center' }}>{device.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}