import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { isTemplateElement } from '@babel/types'


const DoginfoInsertSlide = ({ match }) => {
    const [usersData, setTrainStep] = useState([]);
    const [img, setImg] = useState();

    const history = useHistory()





    function Submit() {
        const article = {
            iddog: match.params.id,
            img: img,
        };
        axios.post('http://35.187.253.40/admin/insertslidedog.php', article)
            .then(res => {
                alert(res.data);
                history.push(`/doginfo/${match.params.id}`)
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
                        <h4> แก้ไขรูปภาพ</h4>
                    </CCardHeader>
                    <CCardBody>
                        <form>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr >
                                        <td width="200">
                                            รูปภาพ
                                        </td>
                                        <td>
                                            <img src={img} width="500" />
                                            <input type="file" onChange={(e) => uploadImage(e)} />
                                        </td>
                                    </tr>
                                </tbody>
                                <tr>
                                    <td align="center" colSpan="2">
                                        <CButton color="warning" onClick={() => history.push(`/doginfo/${match.params.id}`)}> ย้อนกลับ </CButton>
                                        &nbsp;&nbsp;&nbsp;
                                        <CButton color="success" onClick={(e) => Submit(e)}> ยืนยัน </CButton>

                                    </td>

                                </tr>
                            </table>
                        </form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default DoginfoInsertSlide
