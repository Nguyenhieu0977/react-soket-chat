import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom"; // new import
import { Col, Form, FormControl } from "react-bootstrap";
import { updateUser } from "./UserActions"; // new import
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  const top = 40;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function UserUpdate(props) {
  const [email, setEmail] = useState(props.email)
  const [username, setUsername] = useState(props.username)
  const [password, setPassword] = useState(props.password)
  const [re_password, setRe_password] = useState()

  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const onSignupClick = () => {
    const userData = {
      email: email,
      username: username,
      password: password,
      re_password: re_password,
    };
    props.setOpen(false)
    const id = props.id
    dispatch(updateUser(id ,userData)); // <-- signup new user request
  };


  const handleClose = () => {
    props.setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">Thêm mới tài khoản</h4>
      <hr />
      <Col md="12">
        <Form>
          <Form.Group controlId="usernameId">
            <Form.Label>Nhập tên đăng nhập</Form.Label>
            <Form.Control
              isInvalid={updateUser.usernameError}
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <FormControl.Feedback type="invalid">
              {updateUser.usernameError}
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group controlId="usernameId">
            <Form.Label>Địa chỉ Mail</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Nhập Địa chỉ Mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="passwordId">
            <Form.Label>Nhập mật khẩu</Form.Label>
            <Form.Control
              isInvalid={updateUser.passwordError}
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {updateUser.passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="re_passwordId">
            <Form.Label>Nhập lại mật khẩu:</Form.Label>
            <Form.Control
              isInvalid={updateUser.re_passwordError}
              type="password"
              name="re_password"
              placeholder="Nhập lại mật khẩu"
              value={re_password}
              onChange={e => setRe_password(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {updateUser.re_passwordError}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>
          <button type="submit" className="btn-sm btn-success" onClick={onSignupClick} style={{ marginTop: "6px" }}>
            <i className="ace-icon fa fa-plus icon-on-right bigger-110" />&nbsp;
            Cập nhật
          </button>
          <button type="submit" className="btn-sm " onClick={handleClose} style={{ marginTop: "6px" }}>
            <i className="ace-icon fa fa-close icon-on-right bigger-110" />&nbsp;
            Đóng
          </button>
        </div>
      </Col>
    </div>
  )

  return (
    <div>
      {body}
    </div>
  );
}

export default withRouter(UserUpdate)