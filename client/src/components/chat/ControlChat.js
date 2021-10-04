import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ChatUsers from './ChatUsers'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        // maxWidth: '90%',
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        overflow: 'auto',
        maxHeight: "80%",
        fontSize: 14,
        // border:"solid 1px"
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));
function ControlChat(props) {
    const { roomId, user, users } = props
    const classes = useStyles();

    return (
        <List className={classes.root} subheader={<li />}>
            <h1 className="room-name">Room: {roomId}</h1>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={user.picture} />
                </ListItemAvatar>
                <ListItemText
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                                fontSize="14px"
                            >
                                <h5>{user.name}</h5>
                            </Typography>
                            <h6>{"Nguyen Khac Hieu"}</h6>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
                {user && <ChatUsers users={users}/>}
            
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((sectionId) => (
                <li key={`section-${sectionId}`} >
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                    <p>Nguyeen Khac Hieu</p>
                </li>
            ))}
        </List>
    );
}
export default withRouter(ControlChat);