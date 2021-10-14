import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { isTemplateElement } from '@babel/types'


const Dogstepinsert = ({ match }) => {
    const [usersData, setTrainStep] = useState([]);
    const [gif, setGif] = useState();
    const [descrip, setDescrip] = useState();
    const [step, setStep] = useState();

    const history = useHistory()





    function Submit() {
        const article = {
            idtrain: match.params.id,
            gif: gif,
            descrip: descrip,
            step: step,
        };
        axios.post('http://35.187.253.40/admin/inserttrainstep.php', article)
            .then(res => {
                alert(res.data);
                history.push(`/dogtrain/${match.params.id}`)
            })
            .catch(err => {
                alert(err);
            })
    }



    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setGif(base64);
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
                                            ขั้นตอนที่ 
                                        </td>
                                        <td>
                                            <input size="8" type="text" value={step} onChange={(e) => setStep(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="150">
                                            รูปการฝึกขั้นตอนที่ {step}
                                        </td>
                                        <td>
                                            <img src={gif} width="500" />
                                            <input type="file" onChange={(e) => uploadImage(e)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            คำอธิบายการฝึกขั้นตอนที่ {step}
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={descrip} onChange={(e) => setDescrip(e.target.value)} />

                                        </td>
                                    </tr>
                                </tbody>
                                <button onClick={(e) => Submit(e)}> ยืนยัน </button>
                            </table>
                        </form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Dogstepinsert
