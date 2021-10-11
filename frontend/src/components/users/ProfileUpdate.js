import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom"; // new import
import { Col, Form, FormControl, } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Select from "react-select";
import { getProfile, getProfiles, updateProfile } from "./UserActions";

const useStyles = makeStyles((theme) => ({
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

function ProfileUpdate(props) {
  const classes = useStyles();
  const profile = useSelector(state => state.profile.data)
  console.log(profile)
  console.log(props.id)
  const [first_name, setFirst_name] = useState()
  const [last_name, setLast_name] = useState()
  const [email, setEmail] = useState()
  const [groups, setGroups] = useState()
  const [unit_id, setUnit_id] = useState()
  const [phone, setPhone] = useState()
  const [city, setCity] = useState()
  const [sort_id, setSort_id] = useState()
  const [user, setUser] = useState()
  const src = "http://127.0.0.1:8000/media/profiles/profile-pic.jpg"
  const [image, setImage] = useState(src)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const dispatch = useDispatch();

  const groupsFix = [
    { value: 1, label: "Quản trị hệ thống" },
    { value: 2, label: "Chủ trì phòng họp" },
    { value: 3, label: "Thành viên" }
  ]

  const handleChangePro = (groups) => {
    setGroups(groups)
  }

  useEffect(() => {
    setFirst_name(profile.first_name ? profile.first_name : "")
    setLast_name(profile.last_name ? profile.last_name : "")
    setEmail(profile.email ? profile.email : "")
    setGroups(profile.groups ? profile.groups : "")
    setUnit_id(profile.unit_id ? profile.unit_id : 1)
    setPhone(profile.phone ? profile.phone : "")
    setSort_id(profile.sort_id ? profile.sort_id : "")
    setImage(profile.image ? profile.image : src)
    setUser(profile.user)
  }, [profile.id])

  // useEffect(() => {
  //   dispatch(getProfiles())
  // }, [])


  const onUpdateClick = () => {
    let form_data = new FormData();
    if(image.name){
      form_data.append('image', image, image.name)
    }
    form_data.append('id', props.id)
    form_data.append('first_name', first_name)
    form_data.append('last_name', last_name)
    form_data.append('groups', groups.value?groups.value: groups)
    form_data.append('unit_id', unit_id)
    form_data.append('phone', phone)
    form_data.append('sort_id', sort_id)
    form_data.append('user', user)
    dispatch(updateProfile(props.id, form_data)); // <-- signup new user request
    props.setOpen2(false);
  };

  const handleClose = () => {
    props.setOpen2(false);
  }

  const handleChangeImage = (e) =>{
    setImage(e.target.files[0])
    let reader = new FileReader();

    reader.onloadend = () => {
     setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  console.log(image)

  return (
    <Col md="12">
      <Form>
        <Form.Group controlId="usernameId">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Nhập Tên thường dùng"
            value={first_name}
            onChange={e => setFirst_name(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="usernameId">
          <Form.Label>Tên hiển thị</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Nhập Họ và tên lót"
            value={last_name}
            onChange={e => setLast_name(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="usernameId">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Nhập Số điện thoại"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="usernameId">
          <Form.Label>Chọn Vai trò</Form.Label>
          <Select
            value={groups}
            onChange={handleChangePro}
            options={groupsFix}
            placeholder={"Chọn Vai trò"}
            defaultValue={groupsFix[2]}
          />
        </Form.Group>
        <Form.Group controlId="usernameId">
          <Form.Label>Đơn vị</Form.Label>
          <Select
            value={unit_id}
            onChange={handleChangePro}
            options={groupsFix}
            placeholder={"Chọn Đơn vị"}
          />
        </Form.Group>
        <div className="row">
          <div className="col-xs-12 col-sm-9" style={{marginLeft:"-12px"}}>
            <Form.Group controlId="usernameId">
              <Form.Label>Chọn Vai trò</Form.Label>
              <input
                className='form-control'
                type='file'
                onChange={handleChangeImage}
              // accept="image/png, image/jpeg" 
              />
            </Form.Group>
          </div>
          <div className="col-xs-12 col-sm-3">
          <div className={classes.root}>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            <Avatar alt="Khac Hieu" src={imagePreviewUrl?imagePreviewUrl:image} className={classes.large} />
          </div>
          </div>
          

        </div>

        <Form.Group controlId="usernameId">
          <Form.Label>Thứ tự hiển thị</Form.Label>
          <Form.Control
            type="text"
            name="sort_id"
            placeholder="Nhập Địa chỉ Mail"
            value={sort_id}
            onChange={e => setSort_id(e.target.value)}
          />
        </Form.Group>

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
  );
}
export default withRouter(ProfileUpdate)