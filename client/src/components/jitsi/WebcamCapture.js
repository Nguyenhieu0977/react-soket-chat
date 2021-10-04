import React from 'react'
import Webcam from "react-webcam";

import Select from "react-select";

const WebcamCapture = () => {
    const [deviceId, setDeviceId] = React.useState();
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(mediaDevices =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")
        ), [setDevices]);

    React.useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    const handleChangePro = (deviceId) => {
        setDeviceId(deviceId)
    }
    console.log(deviceId)

    const deviceAll = devices.map((device, key) => (
        { value: device.deviceId, label: device.label }
    ))

    console.log(deviceAll)

    return (
        <>
            {/* {devices.map((device, key) => (
                <div>
                    <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} />
                    {device.label || `Device ${key + 1}`}
                </div>

            ))} */}

            <Webcam audio={false} height={ 360 } width={640} videoConstraints={{ deviceId: deviceId?.value }} />

            <Select
                value={deviceId}
                onChange={handleChangePro}
                options={deviceAll}
                placeholder={"Chọn mức độ mưu tiên"}
            />
        </>
    );
};
export default WebcamCapture
