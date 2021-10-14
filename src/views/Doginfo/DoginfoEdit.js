import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'


const DoginfoEdit = ({ match }) => {
    const [usersData, setDoginfo] = useState([]);
    const [iddoginfo, setIddog] = useState([]);
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
    const [path, setPath] = useState();
    const [dogimage, setDogimage] = useState([]);
    const [submit, setSubmit] = useState(false)
    const history = useHistory()


    useEffect(() => {
        axios.get('http://35.187.253.40/admin/showeditdoginfo.php', {
            params: {
                iddoginfo: match.params.id
            }
        })
            .then(res => {
                setDoginfo(res.data.all);
                setDogname(res.data.dogname);
                setOrigin(res.data.origin);
                setTypeuse(res.data.typeuse);
                setHabit(res.data.habit);
                setSize(res.data.size);
                setEars(res.data.ears);
                setBody(res.data.body);
                setTail(res.data.tail);
                setWool(res.data.wool);
                setWoolcolor(res.data.woolcolor);
                setCare(res.data.care);
                setShower(res.data.shower);
                setComb(res.data.comb);
                setExercise(res.data.exercise);
                setCaregiver(res.data.caregiver);
                setType(res.data.type);
                setTypewool(res.data.typewool);
                setTypeears(res.data.typeears);
                setImg(res.data.img);
                setImgcut(res.data.imgcut);

            })
            .catch(err => {
                alert(err)
            })
    }, [])


    useEffect(() => {
        axios.get('http://35.187.253.40/admin/dogimage.php', {
            params: {
                iddoginfo: match.params.id
            }
        })
            .then(res => {
                setDogimage(res.data);
            })
            .catch(err => {
                alert(err)
            })
    }, [dogimage])


    function Submit() {
        const article = {
            iddoginfo: match.params.id,
            dogname: dogname,
            origin: origin,
            typeuse: typeuse,
            habit: habit,
            size: size,
            ears: ears,
            body: body,
            tail: tail,
            care: care,
            wool: wool,
            woolcolor: woolcolor,
            shower: shower,
            comb: comb,
            exercise: exercise,
            caregiver: caregiver,
            type: type,
            typewool: typewool,
            typeears: typeears,
            img: img,
            imgcut: imgcut
        };
        axios.post('http://35.187.253.40/admin/updatedoginfo.php', article)
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

    const uploadImagecut = async (e) => {
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





    console.log(img)
    const user = usersData.find(user => user.iddoginfo === match.params.id)
    const userDetails = user ? Object.entries(user) :
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    return (
        <CRow>
            <CCol lg={12}>
                <CCard>
                    <CCardHeader>
                        <h4> แก้ไขข้อมูลสายพันธุ์สุนัข </h4>
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
                                            <textarea rows="8" cols="200" type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            typeuse
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={typeuse} onChange={(e) => setTypeuse(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            habit
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={habit} onChange={(e) => setHabit(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            size
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="150">
                                            ears
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={ears} onChange={(e) => setEars(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            body
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            tail
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={tail} onChange={(e) => setTail(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            wool
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={wool} onChange={(e) => setWool(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            woolcolor
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={woolcolor} onChange={(e) => setWoolcolor(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="150">
                                            care
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={care} onChange={(e) => setCare(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            shower
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={shower} onChange={(e) => setShower(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            comb
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={comb} onChange={(e) => setComb(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            exercise
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            caregiver
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={caregiver} onChange={(e) => setCaregiver(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="150">
                                            type
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={type} onChange={(e) => setType(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            typewool
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={typewool} onChange={(e) => setTypewool(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            typeears
                                        </td>
                                        <td>
                                            <textarea rows="8" cols="200" type="text" value={typeears} onChange={(e) => setTypeears(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            imgcut
                                        </td>
                                        <td>
                                            <img src={imgcut} width="500" />
                                            <br />
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

            <CCol lg={12}>
                <CCard>
                    <CCardHeader>
                        <h4> แก้ไขรูปสไลด์ </h4>
                    </CCardHeader>
                    <CCardBody>
                        <form>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td width="150">
                                            รูปที่
                                        </td>
                                        <td>
                                            รูปภาพ
                                        </td>
                                        <td width="150">
                                            แก้ไข
                                        </td>
                                        <td>
                                            ลบ
                                        </td>
                                    </tr>
                                    {dogimage == null ? (
                                        <>
                                            <tr>
                                                <td colSpan="4">
                                                    <h4>ยังไม่มีข้อมูล</h4>
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {dogimage.map((item, index) => (
                                                <tr>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <img src={item.path} width="250" />
                                                    </td>
                                                    <td>
                                                        <CButton size="sm" color="warning" onClick={() => history.push(`/doginfo/${item.iddoginfo}`)}>
                                                            Edit
                                                        </CButton>
                                                    </td>
                                                    <td>
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true);  }}>
                                                            Delete
                                                        </CButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}

                                </tbody>

                            </table>
                        </form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default DoginfoEdit
