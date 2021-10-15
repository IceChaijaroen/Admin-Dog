import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { isTemplateElement } from '@babel/types'


const DogEdit = ({ match }) => {
    const [udogid, setUdogid] = useState();
    const [udogname, setUdogname] = useState();
    const [udogsex, setUdogsex] = useState();
    const [udogbreed, setUdogbreed] = useState();
    const [udogbd, setUdogbd] = useState();
    const [udogprocess, setUdogprocess] = useState();
    const [udogimg, setUdogimg] = useState();
    const [userid, setUserid] = useState();
    const [dogbreed, setDogbreed] = useState([]);

    const history = useHistory()

    useEffect(() => {
        axios.get('http://35.187.253.40/admin/showedituserdog.php', {
            params: {
                userid: match.params.id
            }
        })
            .then(res => {
                setUdogname(res.data.udogname);
                setUdogsex(res.data.udogsex);
                setUdogbreed(res.data.udogbreed);
                setUdogbd(res.data.udogbd);
                setUdogprocess(res.data.udogprocess);
                setUdogimg(res.data.udogimg);
                setUserid(res.data.userid);
            })
            .catch(err => {
                alert(err)
            })
    }, [])


    useEffect(() => {
        axios.get('http://35.187.253.40/admin/doginfo.php')
            .then(res => {
                setDogbreed(res.data);
            })
            .catch(err => {
                alert(err)
            })
    }, [dogbreed])




    function Submit() {
        const article = {
            udogid: match.params.id,
            udogname: udogname,
            udogsex: udogsex,
            udogbreed: udogbreed,
            udogbd: udogbd,
            udogprocess: udogprocess,
            udogimg: udogimg,
        };
        axios.post('http://35.187.253.40/admin/updateuserdog.php', article)
            .then(res => {
                alert(res.data);
                history.push(`/users/${userid}`)
            })
            .catch(err => {
                alert(err);
            })
    }



    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setUdogimg(base64);
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
                                            ชื่อสุนัข
                                        </td>
                                        <td>
                                            <input type="text" size="20" value={udogname} onChange={(e) => setUdogname(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="200">
                                            เพศ
                                        </td>
                                        <td>
                                            <select value={udogsex} onChange={(e) => setUdogsex(e.target.value)}>
                                                <option value="ผู้">ผู้</option>
                                                <option value="เมีย">เมีย</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="200">
                                            สายพันธุ์
                                        </td>
                                        <td>
                                            <select value={udogbreed} onChange={(e) => setUdogbreed(e.target.value)}>
                                                {dogbreed.map((item, index) => (
                                                    <>
                                                        <option value={item.dogname}>{item.dogname}</option>
                                                    </>
                                                ))}

                                            </select>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="200">
                                            วันเกิด
                                        </td>
                                        <td>
                                            <input type="date" value={udogbd} onChange={(e) => setUdogbd(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="200">
                                            ระดับความสำเร็จ
                                        </td>
                                        <td>
                                            <input type="text" size="5" value={udogprocess} onChange={(e) => setUdogprocess(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <td width="200">
                                            รูปภาพ
                                        </td>
                                        <td>
                                            <img src={udogimg} width="500" />
                                            <input type="file" onChange={(e) => uploadImage(e)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colSpan="2">
                                            <CButton color="warning" onClick={() => history.push(`/users/${userid}`)}> ย้อนกลับ </CButton>
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

export default DogEdit
