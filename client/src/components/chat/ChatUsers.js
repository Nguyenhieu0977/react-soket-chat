import React from "react";
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 440,
        fontSize: 14,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));
function ChatUsers(props) {
    const { users } = props
    const classes = useStyles();

    return (users.length > 0 ? (
        <List className={classes.root} subheader={<li />}>
            {users.map((user, index) => (
                <>
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
                </>
            ))}
        </List>
    ) : (
        <div>There is no one else in this room</div>
    ));
}
export default withRouter(ChatUsers);