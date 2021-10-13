import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse
} from '@coreui/react'


import axios from 'axios'



const Dogtrain = () => {
  const [details, setDetails] = useState([])
  const [dogtrain, setDogtrain] = useState([])
  const [submit, setSubmit] = useState(false)
  const [iduser, setUserid] = useState()
  const history = useHistory()


  useEffect(() => {
    axios.get('http://35.187.253.40/admin/dogtrain.php')
      .then(res => {
        setDogtrain(res.data);
      })
      .catch(err => {
        alert(err)
      })
  }, [dogtrain])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://35.187.253.40/admin/delete.php', {
          params: {
            iduser: iduser
          }
        })
        alert(res.data);
      } catch (err) {
        alert(err);
      }
    }
    if (submit) fetchData();
  }, [submit])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    { key: 'idtrain', _style: { width: '5%' } },
    { key: 'trainname', _style: { width: '20%' } },
    { key: 'trainlevel', _style: { width: '10%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '2%' },
      sorter: false,
      filter: false
    }
  ]


  return (
    <CDataTable
      items={dogtrain}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        'show_details':
          (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => { toggleDetails(index) }}
                >
                  {details.includes(index) ? 'ซ่อน' : 'จัดการข้อมูล'}
                </CButton>
              </td>
            )
          },
        'details':
          (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>ชื่อท่าฝึก : {item.trainname}</h4>
                  {item.trainimg == null || item.trainimg == "" ? (
                    <>
                      <h4>ยังไม่มีรูปภาพ</h4>
                    </>
                  ) : (
                    <>
                      <h4><img src={item.trainimg} width="120" height="120" /></h4>
                    </>
                  )}


                  <CButton size="sm" color="warning" onClick={() => history.push(`/dogtrain/${item.idtrain}`)}>
                    Edit
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setUserid(item.iddoginfo) }}>
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
}

export default Dogtrain
