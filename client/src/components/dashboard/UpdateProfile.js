import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom"; // new import
import { Col, Form, FormControl } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { updateProfile } from "../users/UserActions";

function getModalStyle() {
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
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));


function UpdateProfile(props) {
  const { profile } = props

  const [phone, setPhone] = useState(profile.phone)
  const [first_name, setFirst_name] = useState(profile.first_name)
  const [last_name, setLast_name] = useState(profile.last_name)
  const [groups, setGroups] = useState(profile.groups)
  // const [email, setEmail] = useState(profile.email)
  const [image, setImage] = useState(profile.image)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [errorInput, setErrorInput] = useState()


  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const onUpdateClick = () => {
    if (last_name === null || first_name === null || image.name === null || last_name === "" || first_name === "" || image.name === "") {
      setErrorInput("Bạn phải nhật thông tin các trường bắt buộc")
      props.setStateEdit(true)
    } else {
      let form_data = new FormData();
      if (image.name) {
        form_data.append('image', image, image.name)
      }

      form_data.append('id', props.id)
      form_data.append('first_name', first_name)
      form_data.append('last_name', last_name)
      form_data.append('groups', groups)
      // form_data.append('unit_id', profile.unit_id)
      form_data.append('phone', phone)
      // form_data.append('sort_id', profile.sort_id)
      form_data.append('user', profile.user)
      dispatch(updateProfile(profile.id, form_data)); // <-- signup new user request
      props.setStateEdit(false)
    }

  };

  const handleClose = () => {
    if (profile.last_name === null || profile.first_name === null || profile.last_name === "" || profile.first_name === "") {
      setErrorInput("Bạn phải nhật thông tin các trường bắt buộc")
      props.setStateEdit(true)
    } else {
      props.setStateEdit(false);
    }

  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
    // console.log(e.target.files[0])
    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h4 id="simple-modal-title">Cập nhật thông tin tài khoản</h4>
      <hr />
      <Col md="12">
        <Form>
          <Form.Group controlId="usernameId">
            <Form.Control.Feedback type="invalid">
              <p style={{ color: "red" }}>{errorInput}</p>
            </Form.Control.Feedback>
            <Form.Label>Họ và tên*</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Nhập Họ và tên"
              value={first_name}
              onChange={e => setFirst_name(e.target.value)}
            />

          </Form.Group>
          <Form.Group controlId="usernameId">
            <Form.Label>Tên hiển thị*</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Nhập tên hiển thị"
              value={last_name}
              onChange={e => setLast_name(e.target.value)}
            />
            {/* <Form.Control.Feedback type="invalid" >
              <p style={{color:"red"}}>{errorInput}</p>
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="usernameId">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </Form.Group>

          <div className="row">
            <div className="col-xs-12 col-sm-9" style={{ marginLeft: "-12px" }}>
              <Form.Group controlId="usernameId">
                <Form.Label>Chọn Ảnh dại diện*</Form.Label>
                <input
                  className='form-control'
                  type='file'
                  onChange={handleChangeImage}
                // accept="image/png, image/jpeg" 
                />
                {/* <Form.Control.Feedback type="invalid">
                  {errorInput}
                </Form.Control.Feedback> */}
              </Form.Group>
            </div>
            <div className="col-xs-12 col-sm-3">
              <div className={classes.root}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <Avatar alt="Khac Hieu" src={imagePreviewUrl ? imagePreviewUrl : image} className={classes.large} />
              </div>
            </div>
          </div>
        </Form>
        <div style={{ backgroundColor: "#EFF3F8", fontSize: "20px", textAlign: "center", height: "50px", marginTop: "6px" }}>
          <button type="submit" className="btn-sm btn-success" onClick={onUpdateClick} style={{ marginTop: "6px" }}>
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

export default withRouter(UpdateProfile)