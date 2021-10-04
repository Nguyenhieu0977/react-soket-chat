import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom"; // new import
import { Col, Form, FormControl } from "react-bootstrap";
import { createUser } from "./UserActions"; // new import
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

function UserAdd(props) {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [re_password, setRe_password] = useState()
  const [errorInput, setErrorInput] = useState()

  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const onSignupClick = () => {
    if (email === undefined || username === undefined || password === undefined || re_password === undefined) {
      setErrorInput("Bạn phải nhật đầy đủ thông tin đăng ký")
      props.setOpen(true)
    } else {
      const userData = {
        email: email,
        username: username,
        groups: 2,
        password: password,
        re_password: re_password,
      };
      dispatch(createUser(userData));
      props.setOpen(false)
    }
  };


  const handleClose = () => {
    props.setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">Thêm mới tài khoản người dùng</h4>
      <hr />
      <Col md="12">
        <Form>
          <Form.Group controlId="usernameId">
          <FormControl.Feedback type="invalid">
              {/* {createUser.usernameError} */}
              <p style={{color: "red"}}> {errorInput} </p>
            </FormControl.Feedback>
            <Form.Label>Nhập tên đăng nhập</Form.Label>
            <Form.Control
              // isInvalid={createUser.usernameError}
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            
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
            <FormControl.Feedback type="invalid">
              {/* {createUser.usernameError} */}
              {/* <p style={{color: "red"}}> {errorInput} </p> */}
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group controlId="passwordId">
            <Form.Label>Nhập mật khẩu</Form.Label>
            <Form.Control
              // isInvalid={createUser.passwordError}
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControl.Feedback type="invalid">
              {/* {createUser.passwordError} */}
              {/* <p style={{color: "red"}}> {errorInput} </p> */}
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group controlId="re_passwordId">
            <Form.Label>Nhập lại mật khẩu:</Form.Label>
            <Form.Control
              // isInvalid={createUser.re_passwordError}
              type="password"
              name="re_password"
              placeholder="Nhập lại mật khẩu"
              value={re_password}
              onChange={e => setRe_password(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {/* {createUser.re_passwordError} */}
              {/* <p style={{color: "red"}}> {errorInput} </p> */}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>
          <button type="submit" className="btn-sm btn-success" onClick={onSignupClick} style={{ marginTop: "6px" }}>
            <i className="ace-icon fa fa-plus icon-on-right bigger-110" />&nbsp;
            Thêm mới
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

export default withRouter(UserAdd)