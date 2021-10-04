import React from 'react'
import Webcam from "react-webcam";

import Select from "react-select";

function WebcamSelect(props){
    const {webcamsl} = props
    // const [deviceId, setDeviceId] = React.useState();
    // const [devices, setDevices] = React.useState([]);

    // const handleChangePro = (deviceId) => {
    //     setDeviceId(deviceId)
    // }
    // console.log(deviceId)

    // const deviceAll = webcamsl?.map((device, key) => (
    //     { value: device.deviceId, label: device.label }
    // ))

    // console.log(webcamsl)

    return (
        <>
            {webcamsl?.map((device, key) => (
                <div>
                    <Webcam audio={false} videoConstraints={{ deviceId: device.value }} />
                    {device.label || `Device ${key + 1}`}
                </div>

            ))}

            {/* <Webcam audio={false} height={'100%'} width={'100%'} videoConstraints={{ deviceId: webcamsl }} screenshotFormat="image/jpeg" /> */}

            {/* <Select
                value={deviceId}
                onChange={handleChangePro}
                options={deviceAll}
                placeholder={"Chọn Camera"}
            /> */}
        </>
    );
};
export default WebcamSelect
