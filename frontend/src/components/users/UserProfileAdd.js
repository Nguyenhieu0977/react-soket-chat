import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom"; // new import
import { Link } from "react-router-dom";
import { Col, Form, FormControl, } from "react-bootstrap";
import Select from "react-select";
import { createUser } from "./UserActions"; // new import

function UserProfileAdd() {
  const [first_name, setFirst_name] = useState()
  const [last_name, setLast_name] = useState()
  const [email, setEmail] = useState()
  const [groups, setGroups] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [re_password, setRe_password] = useState()
  const dispatch = useDispatch();

  const groupsFix = [
    { value: 1, label: "Quản trị hệ thống" },
    { value: 2, label: "Chủ trì phòng họp" },
    { value: 3, label: "Thành viên" }
  ]

  const handleChangePro = (groups) => {
    setGroups(groups)
  }

  const onSignupClick = () => {
    const userData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      groups: groups,
      username: username,
      password: password,
      re_password: re_password
    };
    dispatch(createUser(userData)); // <-- signup new user request
  };

  return (
    <Col md="12">
      <Form>
        <Form.Group controlId="usernameId">
          <Form.Label>Tên thường dùng</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Nhập Tên thường dùng"
            value={username}
            onChange={e => setFirst_name(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="usernameId">
          <Form.Label>Họ và tên lót</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Nhập Họ và tên lót"
            value={last_name}
            onChange={e => setLast_name(e.target.value)}
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
        </Form.Group>
      

        <Form.Group controlId="usernameId">
          <Form.Label>Chọn Vai trò</Form.Label>
          <Select
            value={groups}
            onChange={handleChangePro}
            options={groupsFix}
            placeholder={"Chọn Vai trò"}
          />
        </Form.Group>
        <Form.Group controlId="passwordId">
          <Form.Label>Nhập mật khẩu</Form.Label>
          <Form.Control
            isInvalid={createUser.passwordError}
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {createUser.passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="re_passwordId">
          <Form.Label>Nhập lại mật khẩu:</Form.Label>
          <Form.Control
            isInvalid={createUser.re_passwordError}
            type="password"
            name="re_password"
            placeholder="Nhập lại mật khẩu"
            value={re_password}
            onChange={e => setRe_password(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {createUser.re_passwordError}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
      <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>
        <button type="submit" className="btn-sm btn-success" onClick={onSignupClick} style={{  marginTop: "6px" }}>
          <i className="ace-icon fa fa-plus icon-on-right bigger-110" />&nbsp;
          Thêm mới
        </button>
      </div>

    </Col>
  );
}

export default withRouter(UserProfileAdd)