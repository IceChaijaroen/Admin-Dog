import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { isTemplateElement } from '@babel/types'


const Dogtraineditstep = ({ match }) => {
    const [usersData, setTrainStep] = useState([]);
    const [gif, setGif] = useState();
    const [descrip, setDescrip] = useState();
    const [step, setStep] = useState();

    const history = useHistory()

    useEffect(() => {
        axios.get('http://35.187.253.40/admin/showedittrainstep.php', {
            params: {
                idgif: match.params.id
            }
        })
            .then(res => {
                setTrainStep(res.data.all);
                setGif(res.data.gif);
                setDescrip(res.data.descrip);
                setStep(res.data.step);
            })
            .catch(err => {
                alert(err)
            })
    }, [])




    function Submit() {
        const article = {
            idgif: match.params.id,
            gif: gif,
            descrip: descrip,
            step: step,
        };
        axios.post('http://35.187.253.40/admin/updatetrainstep.php', article)
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


    const user = usersData.find(user => user.idtrain === match.params.id)
    const userDetails = user ? Object.entries(user) :
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    return (
        <CRow>
            <CCol lg={6}>
                <CCard>
                    <CCardHeader>
                        <h4> ข้อมูลการฝึก </h4>
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

export default Dogtraineditstep
