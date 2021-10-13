import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'


const User = ({ match }) => {
  const [usersData, setUserinfo] = useState([]);
  const [iduser, setIduser] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [img, setImg] = useState();
  const [submit, setSubmit] = useState(false)

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

  console.log(iduser, username, email, password, name, lastname)


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
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <form onSubmit={(e) => Submit(e)}>
              <table className="table table-striped table-hover">

                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index}>
                          <td>{`${key}:`}</td>
                          {(() => {
                            if (key == 'img') {
                              return (
                                <>
                                  <td>
                                    <img src={img} />
                                    <input type="file" onChange={(e) => uploadImage(e)} />
                                  </td>
                                </>
                              )
                            } else if (key == 'username') {
                              return (
                                <td><input type="text" value={username} onChange={e => setUsername(e.target.value)} /></td>
                              )
                            } else if (key == 'email') {
                              return (
                                <td><input type="text" value={email} onChange={e => setEmail(e.target.value)} /></td>
                              )
                            } else if (key == 'password') {
                              return (
                                <td><input type="text" value={password} onChange={e => setPassword(e.target.value)} /></td>
                              )
                            } else if (key == 'name') {
                              return (
                                <td><input type="text" value={name} onChange={e => setName(e.target.value)} /></td>
                              )
                            } else if (key == 'lastname') {
                              return (
                                <td><input type="text" value={lastname} onChange={e => setLastname(e.target.value)} /></td>
                              )
                            } else {
                              return (
                                <td><input type="text" value={value} disabled={true} /></td>
                              )
                            }
                          })()}
                        </tr>
                      )
                    })
                  }
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
