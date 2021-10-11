import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from './UserActions'

export const UserData = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        users
    )


}


