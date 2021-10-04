import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const formData = (date) => {
    if(!date) return '';

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

const Clock = () => {
    const [timeString, setTimeString] = useState('')
    
    useEffect(()=>{
        const clockInterval = setInterval(()=>{
            const now = new Date();
            // HH:mm:ss
            const newTimeString = formData(now);
            setTimeString(newTimeString);
        }, 1000);
        return () => {
            //cleanup
            clearInterval(clockInterval);
        }
    }, [])
    
    return (
        <p style={{fontSize: "22px"}}>{timeString}</p>
    )
}

export default Clock;
