import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { isTemplateElement } from '@babel/types'


const DoginfoEditSlide = ({ match }) => {
    const [img, setImg] = useState();
    const [iddog, setIddog] = useState();


    const history = useHistory()

    useEffect(() => {
        axios.get('http://35.187.253.40/admin/showeditslide.php', {
            params: {
                idimg: match.params.id
            }
        })
            .then(res => {
                setImg(res.data.path);
                setIddog(res.data.iddog);
            })
            .catch(err => {
                alert(err)
            })
    }, [])




    function Submit() {
        const article = {
            idimg: match.params.id,
            img: img,
        };
        axios.post('http://35.187.253.40/admin/updatedogslide.php', article)
            .then(res => {
                alert(res.data);
                history.push(`/doginfo/${iddog}`)
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
                        <h4> ข้อมูลการฝึก {match.params.id} </h4>
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
                                    <tr>
                                        <td align="center" colSpan="2">
                                            <CButton color="warning" onClick={() => history.push(`/doginfo/${iddog}`)}> ย้อนกลับ </CButton>
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

export default DoginfoEditSlide
