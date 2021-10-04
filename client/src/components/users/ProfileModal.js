import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom"; // new import
import { Col, Form, FormControl, } from "react-bootstrap";
import Select from "react-select";
import { updateProfile } from "./UserActions";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 30;
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

function ProfileModal(props) {

  const [first_name, setFirst_name] = useState()
  const [last_name, setLast_name] = useState()
  const [email, setEmail] = useState()
  const [groups, setGroups] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [re_password, setRe_password] = useState()
  const src = "/media/profiles/profile-pic.jpg"
  const [image, setImage] = useState(src)
  const dispatch = useDispatch();

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);


  const groupsFix = [
    { value: 1, label: "Quản trị hệ thống" },
    { value: 2, label: "Chủ trì phòng họp" },
    { value: 3, label: "Thành viên" }
  ]

  const handleChangePro = (groups) => {
    setGroups(groups)
  }

  const onUpdateClick = () => {
    const userData = {
      username: "ankhang41",
      first_name: first_name,
      last_name: last_name,
      groups: 2,
      unit_id: 2,
      phone: '09833',
      city: "HCM",
      image: image,

    };
    dispatch(updateProfile(userData)); // <-- signup new user request
    props.setOpen2(false);

  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
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
          <Form.Group controlId="usernameId">
            <Form.Label>Chọn Vai trò</Form.Label>
            <input
              className='form-control'
              type='file'
              // encType="multipart/form-data"
              // name='image'
              // placeholder={`${profiles.image}`}
              onChange={(e) => setImage(e.target.files[0])}
            // value={image}
            // accept="image/png, image/jpeg" 
            />
          </Form.Group>



        </Form>
        <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>
          <button type="submit" className="btn-sm btn-success" onClick={onUpdateClick} style={{ marginTop: "6px" }}>
            <i className="ace-icon fa fa-plus icon-on-right bigger-110" />&nbsp;
            Cập nhật
          </button>
          <button type="submit" className="btn-sm " onClick={props.handleClose2} style={{ marginTop: "6px" }}>
            <i className="ace-icon fa fa-close icon-on-right bigger-110" />&nbsp;
            Đóng
          </button>
        </div>

      </Col>
    </div>
  );

  return (
    <>
      
        {body}
    </>
  );
}
export default withRouter(updateProfile)