import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { isTemplateElement } from '@babel/types'


const DogtrainDetail = ({ match }) => {
    const [usersData, setDogtrain] = useState([]);
    const [trainname, setTrainname] = useState();
    const [trainlevel, setTrainlevel] = useState();
    const [trainimg, setTrainimg] = useState();
    const [traingif, setTraingif] = useState([]);
    const history = useHistory()

    useEffect(() => {
        axios.get('http://35.187.253.40/admin/showeditdogtrain.php', {
            params: {
                idtrain: match.params.id
            }
        })
            .then(res => {
                setDogtrain(res.data.all);
                setTrainname(res.data.trainname);
                setTrainlevel(res.data.trainlevel);
                setTrainimg(res.data.trainimg);
            })
            .catch(err => {
                alert(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://35.187.253.40/admin/traingif.php', {
            params: {
                idtrain: match.params.id
            }
        })
            .then(res => {
                setTraingif(res.data);
            })
            .catch(err => {
                alert(err)
            })
    }, [traingif])


    function Submit() {
        const article = {
            idtrain: match.params.id,
            trainname: trainname,
            trainlevel: trainlevel,
            trainimg: trainimg,
        };
        axios.post('http://35.187.253.40/admin/updatedogtrain.php', article)
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
        setTrainimg(base64);
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
                                            ชื่อฝึก
                                        </td>
                                        <td>
                                            <input type="text" value={match.params.id} disabled={true} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="150">
                                            ชื่อฝึก
                                        </td>
                                        <td>
                                            <input type="text" value={trainname} onChange={(e) => setTrainname(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            เลเวลการฝึก
                                        </td>
                                        <td>
                                            <select value={trainlevel} onChange={(e) => setTrainlevel(e.target.value)}>
                                                <option value="0">level 0</option>
                                                <option value="1">level 1</option>
                                                <option value="2">level 2</option>
                                                <option value="3">level 3</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            รูปปกการฝึก
                                        </td>
                                        <td>
                                            <img src={trainimg} width="500" />
                                            <input type="file" onChange={(e) => uploadImage(e)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" align="center">
                                            <CButton size="lg" color="success" onClick={(e) => Submit(e)}> ยืนยัน </CButton>
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
                        <h4> แก้ไขขั้นตอนการฝึกท่า : {trainname} </h4>
                    </CCardHeader>
                    <CCardBody>
                        <form>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td width="2%">
                                            ขั้นตอนที่
                                        </td>

                                        <td width="15%">
                                            รูปภาพ
                                        </td>
                                        <td width="30%">
                                            คำอธิบาย
                                        </td>
                                        <td width="2%">
                                            แก้ไข
                                        </td>
                                        <td width="2%">
                                            ลบ
                                        </td>
                                    </tr>
                                    {traingif.map((item, key) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        {item.step}
                                                    </td>

                                                    <td>
                                                        <img src={item.gif} width="250" />
                                                    </td>
                                                    <td>
                                                        {item.descrip}
                                                    </td>
                                                    <td>
                                                        <CButton size="lr" color="warning" onClick={() => history.push(`/dogtrain/${match.params.id}/${item.idgif}`)}> แก้ไข </CButton>
                                                    </td>
                                                    <td>
                                                        <CButton size="lr" color="danger"> ลบ </CButton>
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

export default DogtrainDetail