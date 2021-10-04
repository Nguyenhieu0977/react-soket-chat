import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { getChatGroup } from '../ChatActions'
import ChatUserGroupModal from './ChatUserGroupModal'

export default function ChatAvatarGroup(props) {
    const { id, user_group, chat_group } = props
    const dataUser = useSelector(state => state.users.data)
    const dispatch = useDispatch()
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"

    const ListUserGroup = dataUser.filter(items => user_group.includes(items.id)).map((item, index) => {
    // const ListUserGroup = dataUser.filter(items => items.id ===2).map((item, index) => {
        return (
            <Avatar alt="Remy Sharp" src={image} key={index} id={item.id} /> 
        )
    })
    const handleUsers = () => {
        dispatch(getChatGroup(id))
    }

    return (
        <>
            <AvatarGroup max={4}>
                {ListUserGroup}
            </AvatarGroup>
            <div className="userMeta" style={{ cursor: "pointer" }} onClick={handleUsers}>
                <p>{chat_group}</p>
                {/* <i className="fa fa-user"  >&nbsp;&nbsp;{user_group.length}&nbsp; Thành viên</i> */}
                <ChatUserGroupModal dataUser={dataUser} chat_group={chat_group} user_group={user_group} />
            </div>
        </>
    );
}