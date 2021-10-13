import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'


const ChartsDetail = ({ match }) => {
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
  const [dogimage, setDogimage] = useState();
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
        setDogimage(res.data.all);
        setPath(res.data.path);
      })
      .catch(err => {
        alert(err)
      })
  },[dogimage])


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
                          <td>{`${key} `}</td>
                          {(() => {
                            if (key == 'imgcut') {
                              return (
                                <>
                                  <td>
                                    <img src={imgcut} />
                                    <input type="file" onChange={(e) => uploadImagecut(e)} />
                                  </td>
                                </>)
                            } else if (key == 'dogname') {
                              return (
                                <td><input type="text" value={dogname} onChange={e => setDogname(e.target.value)} maxlength="200" size="70" /></td>
                              )
                            } else if (key == 'origin') {
                              return (
                                <td>
                                  <textarea rows="10" cols="80" type="text" value={origin} onChange={e => setOrigin(e.target.value)} />
                                </td>
                              )
                            } else if (key == 'typeuse') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={typeuse} onChange={e => setTypeuse(e.target.value)} /></td>
                              )
                            } else if (key == 'habit') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={habit} onChange={e => setHabit(e.target.value)} /></td>
                              )
                            } else if (key == 'size') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={size} onChange={e => setSize(e.target.value)} /></td>
                              )
                            } else if (key == 'ears') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={ears} onChange={e => setEars(e.target.value)} /></td>
                              )
                            } else if (key == 'body') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={body} onChange={e => setBody(e.target.value)} /></td>
                              )
                            } else if (key == 'tail') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={tail} onChange={e => setTail(e.target.value)} /></td>
                              )
                            } else if (key == 'wool') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={wool} onChange={e => setWool(e.target.value)} /></td>
                              )
                            } else if (key == 'woolcolor') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={woolcolor} onChange={e => setWoolcolor(e.target.value)} /></td>
                              )
                            } else if (key == 'care') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={care} onChange={e => setCare(e.target.value)} /></td>
                              )
                            } else if (key == 'shower') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={shower} onChange={e => setShower(e.target.value)} /></td>
                              )
                            } else if (key == 'comb') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={comb} onChange={e => setComb(e.target.value)} /></td>
                              )
                            } else if (key == 'exercise') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={exercise} onChange={e => setExercise(e.target.value)} /></td>
                              )
                            } else if (key == 'caregiver') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={caregiver} onChange={e => setCaregiver(e.target.value)} /></td>
                              )
                            } else if (key == 'type') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={type} onChange={e => setType(e.target.value)} /></td>
                              )
                            } else if (key == 'typewool') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={typewool} onChange={e => setTypewool(e.target.value)} /></td>
                              )
                            } else if (key == 'typeears') {
                              return (
                                <td><textarea rows="10" cols="80" type="text" value={typeears} onChange={e => setTypeears(e.target.value)} /></td>
                              )
                            } else if (key == 'iddoginfo') {
                              return (
                                <td><input type="text" value={match.params.id} disabled={true} /></td>
                              )
                            } else {
                              return (
                                <>

                                </>
                              )
                            }

                          })()}

                        </tr>

                      )
                    })
                  }
                 {/**  {
                    dogimage.map((item) => (
                      <>
                        <tr>
                          <td>
                            รูปที่ 
                          </td>
                          <td>
                            <img src={item.path} />
                            <button onClick={() => history.push(`/charts/${item.iddoginfo}`)}>แก้ไขรูปนี้</button>
                          </td>
                        </tr>
                      </>
                    ))
                  }*/}
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

export default ChartsDetail
