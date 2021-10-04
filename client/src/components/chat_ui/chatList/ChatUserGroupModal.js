import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ChatListUsersGroup from './ChatListUsersGroup';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow:"scoll",
  },
}));

export default function ChatUserGroupModal(props) {
  const { chat_group, user_group, dataUser } = props;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"

  const ChatListItem = dataUser.filter(items => user_group.includes(items.id)).map((item, index) => {
    return (
      <ChatListUsersGroup
        id={item.id}
        fullname={item.last_name + " " + item.first_name}
        key={item.id}
        animationDelay={index + 1}
        active={item.active ? "active" : ""}
        isOnline={item.isOnline ? "active" : ""}
        image={image}
      />
    )
  })

  const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">
          {user_group !== null && <h4> &nbsp;&nbsp; <i className="fa fa-users" style={{ color: "green" }}>&nbsp;Thành viên {chat_group}: ({user_group.length})</i> </h4>}
        </h2>
          {ChatListItem}
      </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        <i className="fa fa-users" style={{ color: "green" }}>&nbsp;Thành viên ({user_group.length})</i>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}