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



const Doginfo = () => {
  const [details, setDetails] = useState([])
  const [doginfo, setDoginfo] = useState([])
  const [submit, setSubmit] = useState(false)
  const [iddoginfo, setiddoginfo] = useState()
  const history = useHistory()


  useEffect(() => {
    axios.get('http://35.187.253.40/admin/doginfo.php')
      .then(res => {
        setDoginfo(res.data);
      })
      .catch(err => {
        alert(err)
      })
  }, [doginfo])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://35.187.253.40/admin/deletedoginfo.php', {
          params: {
            iddoginfo: iddoginfo
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
    { key: 'iddoginfo', _style: { width: '1%' } },
    { key: 'dogname', _style: { width: '20%' } },
    { key: 'origin', _style: { width: '20%' } },
    { key: 'typeuse', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '5%' },
      sorter: false,
      filter: false
    }
  ]


  return (
    <>
      <CCol align="right" lg={12}>
        <table height="30">
          <tr>
            <td text-align="center" >
              <CButton color="success" onClick={() => history.push(`/doginfo/insert`)}> เพิ่มข้อมูลสุนัข</CButton>
            </td>
          </tr>
        </table>
      </CCol>
      <CDataTable
        items={doginfo}
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
                    <h4>สายพันธุ์ : {item.dogname}</h4>
                    {item.imgcut == null || item.imgcut == "" ? (
                      <>
                        <h4>ยังไม่มีรูปภาพ</h4>
                      </>
                    ) : (
                      <>
                        <h4><img src={item.imgcut} width="120" height="120" /></h4>
                      </>
                    )}


                    <CButton size="sm" color="warning" onClick={() => history.push(`/doginfo/${item.iddoginfo}`)}>
                      Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setiddoginfo(item.iddoginfo) }}>
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
            }
        }}
      />
    </>
  )
}

export default Doginfo
