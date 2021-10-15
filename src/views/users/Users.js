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
import { CIcon } from '@coreui/icons-react';


import axios from 'axios'



const Users = () => {
  const [details, setDetails] = useState([])
  const [userinfo, setUserinfo] = useState([])
  const [submit, setSubmit] = useState(false)
  const [iduser, setUserid] = useState()
  const history = useHistory()


  useEffect(() => {
    axios.get('http://35.187.253.40/admin/user.php')
      .then(res => {
        setUserinfo(res.data);
      })
      .catch(err => {
        alert(err)
      })
  }, [userinfo])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://35.187.253.40/admin/delete.php', {
          params: {
            iduser: iduser
          }
        })
        alert(res.data);
        setSubmit(false);
      } catch (err) {
        alert(err);
        setSubmit(false);
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
    { key: 'iduser', _style: { width: '1%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'name', _style: { width: '20%' } },
    { key: 'lastname', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '10%' },
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
              <CButton color="success" onClick={() => history.push(`/users/insert`)}> เพิ่มข้อมูลผู้ใช้</CButton>
            </td>
          </tr>
        </table>
      </CCol>
      <CDataTable
        items={userinfo}
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
                    <h4>email : {item.email}</h4>
                    <h4>password : {item.password}</h4>
                    {item.img == null || item.img == "" ? (
                      <>
                        <h4>ยังไม่มีรูปภาพ</h4>
                      </>
                    ) : (
                      <>
                        <h4><img src={item.img} width="120" height="100" /></h4>
                      </>
                    )}


                    <CButton size="sm" color="warning" onClick={() => history.push(`/users/${item.iduser}`)}>
                      Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setUserid(item.iduser) }}>
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

export default Users
