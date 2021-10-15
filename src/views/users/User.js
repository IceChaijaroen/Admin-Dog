import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'


const User = ({ match }) => {
  const [usersData, setUserinfo] = useState([]);
  const [udogid, setUdogid] = useState();
  const [userdog, setUserdog] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [img, setImg] = useState();
  const [submit, setSubmit] = useState(false)
  const history = useHistory()

  useEffect(() => {
    axios.get('http://35.187.253.40/admin/showedituser.php', {
      params: {
        iduser: match.params.id
      }
    })
      .then(res => {
        setUserinfo(res.data.all);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setName(res.data.name);
        setLastname(res.data.lastname);
        setImg(res.data.img);
      })
      .catch(err => {
        alert(err)
      })
  }, [])


  function Submit() {
    const article = {
      iduser: match.params.id,
      username: username,
      email: email,
      password: password,
      name: name,
      lastname: lastname,
      img: img
    };
    axios.post('http://35.187.253.40/admin/update.php', article)
      .then(res => {
        alert(res.data);
      })
      .catch(err => {
        alert(err);
      })
  }

  useEffect(() => {
    axios.get('http://35.187.253.40/admin/userdog.php', {
      params: {
        iduser: match.params.id
      }
    })
      .then(res => {
        setUserdog(res.data);
      })
      .catch(err => {
        alert(err)
      })
  }, [userdog])



  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImg(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  console.log(img)
  const user = usersData.find(user => user.iduser === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <h4> ข้อมูลการฝึก </h4>
          </CCardHeader>
          <CCardBody>
            <form>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr >
                    <td width="150">
                      Userid
                    </td>
                    <td>
                      <input type="text" size="5" value={match.params.id} disabled={true} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      Username
                    </td>
                    <td>
                      <input type="text" size="50" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      Email
                    </td>
                    <td>
                      <input type="text" size="50" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Password
                    </td>
                    <td>
                      <input type="text" size="50" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      name
                    </td>
                    <td>
                      <input type="text" size="50" value={name} onChange={(e) => setName(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      lastname
                    </td>
                    <td>
                      <input type="text" size="50" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      รูปภาพ
                    </td>
                    <td>
                      <img src={img} width="500" />
                      <br />
                      <input type="file" onChange={(e) => uploadImage(e)} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center">
                      <CButton color="warning" onClick={() => history.push(`/users/`)}> ย้อนกลับ </CButton>
                      &nbsp;&nbsp;&nbsp;
                      <CButton color="success" onClick={(e) => Submit(e)}> ยืนยัน </CButton>
                    </td>
                  </tr>
                </tbody>

              </table>
            </form>
          </CCardBody>
        </CCard>
        <br />
        <br />
        <CCard>
          <CCardHeader>
            <table>
              <tr>
                <td width="90%">
                  <h4> จัดการข้อมูลสุนัข User : {name}  </h4>
                </td>
                <td width="7%">
                  <CButton color="info" onClick={() => { history.push(`/dogtrain/${match.params.id}/:id/${match.params.id}`) }}> เพิ่มท่าฝึกสุนัข</CButton>
                </td>
              </tr>
            </table>
          </CCardHeader>
          <CCardBody>
            <form>
              <table width="100%" className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td width="2%">
                      ขั้นตอนที่
                    </td>

                    <td width="15%">
                      รูปภาพ
                    </td>
                    <td width="20%">
                      คำอธิบาย
                    </td>
                    <td width="2%">
                      แก้ไข
                    </td>
                    <td width="2%">
                      ลบ
                    </td>
                  </tr>
                  {userdog == null ? (
                    <>
                      <tr>
                        <td colSpan="5" width="2%">
                          ไม่มีข้อมูลสุนัข
                        </td>

                      </tr>
                    </>
                  ) : (
                    <>

                    </>
                  )}
                  {userdog.map((item, key) => {
                    return (
                      <>
                        <tr>
                          <td>
                            {item.udogname}
                          </td>

                          <td>
                            <img src={item.udogimg} width="250" />
                          </td>
                          <td width="20%">
                            {item.udogbreed}
                          </td>
                          <td>
                            <CButton size="lr" color="warning" onClick={() => history.push(`/users/${match.params.id}/${item.udogid}`)}> แก้ไข </CButton>
                          </td>
                          <td>
                            <CButton size="lr" color="danger" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setUdogid(item.idgif); }}> ลบ </CButton>
                          </td>
                        </tr>

                      </>
                    )
                  })}

                </tbody>
                <button > ยืนยัน </button>
              </table>
            </form>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
