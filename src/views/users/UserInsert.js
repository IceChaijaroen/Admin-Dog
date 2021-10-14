import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useHistory, useLocation } from 'react-router-dom'

import CIcon from '@coreui/icons-react'
import axios from 'axios'


const UserInsert = ({ match }) => {
    const [usersData, setUserinfo] = useState([]);
    const [iduser, setIduser] = useState([]);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [lastname, setLastname] = useState();
    const [img, setImg] = useState();
    const [submit, setSubmit] = useState(false)
    const history = useHistory()

    function Submit() {
        const article = {
            email: email,
            password: password,
            name: name,
            lastname: lastname,
            img: img
        };
        axios.post('http://35.187.253.40/admin/userinsert.php', article)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                alert(err);
            })
    }



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


    return (
        <CRow>
            <CCol lg={6}>
                <CCard>
                    <CCardHeader>
                        <h4> เพิ่มข้อมูลผู้ใช้ </h4>
                    </CCardHeader>
                    <CCardBody>
                        <form>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td width="150">
                                            Email
                                        </td>
                                        <td>
                                            <input size="40" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            password
                                        </td>
                                        <td>
                                            <input size="40" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            ชื่อ
                                        </td>
                                        <td>
                                            <input size="40" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            นามสกุล
                                        </td>
                                        <td>
                                            <input size="40" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            รูปผู้ใช้
                                        </td>
                                        <td>
                                            <img src={img} width="500" />
                                            <input type="file" onChange={(e) => uploadImage(e)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colSpan="2">
                                        <CButton color="warning" onClick={() => history.push(`/users`)}> ย้อนกลับ </CButton>
                                        &nbsp;&nbsp;&nbsp;
                                        <CButton color="success" onClick={(e) => Submit(e)}> ยืนยัน </CButton>
                                        
                                        </td>
                                       
                                    </tr>
                                </tbody>
                                
                            </table>
                        </form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default UserInsert
