import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useHistory, useLocation } from 'react-router-dom'

import CIcon from '@coreui/icons-react'
import axios from 'axios'


const DoginfoInsert = ({ match }) => {
    const [usersData, setUserinfo] = useState([]);
    const [iddoginfo, setIduser] = useState([]);
    const [dogname, setDogname] = useState();
    const [origin, setOrigin] = useState();
    const [typeuse, setTypeuse] = useState();
    const [habit, setHabit] = useState();
    const [size, setSize] = useState();
    const [ears, setEars] = useState();
    const [body, setBody] = useState();
    const [tail, setTail] = useState();
    const [wool, setWool] = useState();
    const [woolcolor, setWoolcolor] = useState();
    const [care, setCare] = useState();
    const [shower, setShower] = useState();
    const [comb, setComb] = useState();
    const [exercise, setExercise] = useState();
    const [caregiver, setCaregiver] = useState();
    const [type, setType] = useState();
    const [typewool, setTypewool] = useState();
    const [typeears, setTypeears] = useState();
    const [img, setImg] = useState();
    const [imgcut, setImgcut] = useState();
    const history = useHistory()


    function Submit() {
        const article = {
            dogname: dogname,
            origin: origin,
            typeuse: typeuse,
            habit: habit,
            size: size,
            ears: ears,
            body: body,
            tail: tail,
            wool: wool,
            woolcolor: woolcolor,
            care: care,
            shower: shower,
            comb: comb,
            exercise: exercise,
            caregiver: caregiver,
            type: type,
            typewool: typewool,
            typeears: typeears,
            imgcut: imgcut,
        };
        axios.post('http://35.187.253.40/admin/insertdoginfo.php', article)
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
        setImgcut(base64);
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
                        <h4> เพิ่มข้อมูลสุนัข </h4>
                    </CCardHeader>
                    <CCardBody>
                        <form>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td width="150">
                                            dogname
                                        </td>
                                        <td>
                                            <input size="78" type="text" value={dogname} onChange={(e) => setDogname(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            origin
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80"  type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            typeuse
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={typeuse} onChange={(e) => setTypeuse(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            habit
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={habit} onChange={(e) => setHabit(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            size
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="150">
                                            ears
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={ears} onChange={(e) => setEars(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            body
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            tail
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={tail} onChange={(e) => setTail(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            wool
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={wool} onChange={(e) => setWool(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            woolcolor
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={woolcolor} onChange={(e) => setWoolcolor(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="150">
                                            care
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={care} onChange={(e) => setCare(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            shower
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={shower} onChange={(e) => setShower(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            comb
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={comb} onChange={(e) => setComb(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            exercise
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            caregiver
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={caregiver} onChange={(e) => setCaregiver(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="150">
                                            type
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={type} onChange={(e) => setType(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            typewool
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={typewool} onChange={(e) => setTypewool(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            typeears
                                        </td>
                                        <td>
                                            <textarea rows="10" cols="80" type="text" value={typeears} onChange={(e) => setTypeears(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            imgcut
                                        </td>
                                        <td>
                                            <img src={imgcut} width="500" />
                                            <input type="file" onChange={(e) => uploadImage(e)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colSpan="2">
                                            <CButton color="warning" onClick={() => history.push(`/doginfo`)}> ย้อนกลับ </CButton>
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

export default DoginfoInsert
