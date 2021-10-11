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



const Users = () => {
  const [details, setDetails] = useState([])
  const [userinfo, setUserinfo] = useState([])
  const [submit, setSubmit] = useState(false)
  const [iduser, setUserid] = useState()
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

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
    { key: 'name', _style: { width: '40%' } },
    'registered',
    { key: 'email', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (
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
        'status':
          (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>
                {item.status}
              </CBadge>
            </td>
          ),
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
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
        'details':
          (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.name}
                  </h4>
                  <CButton size="sm" color="info" onClick={() => history.push(`/users/${item.iduser}`)}>
                    User Settings
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
  )
}

export default Users
