import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage';
import { useHistory, useLocation } from 'react-router-dom'

const TheHeaderDropdown = (match) => {
  const [adminID, setAdminID] = useState()
  const [admindata, setAdmindata] = useState([])
  const history = useHistory()


  const id = reactLocalStorage.get('adminid');

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://35.187.253.40/admin/admindata.php', {
          params: {
            adminID: id
          }
        })
        setAdmindata(res.data)
      } catch (err) {
        alert(err)
      }
    }
    fetchdata();
  }, [admindata])

  console.log(id)

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      {admindata == null ? (
        <>
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <div className="c-avatar">
              <CButton color="info" className="px-4" onClick={() => { history.push(`/login`); }}>Login</CButton>
            </div>
          </CDropdownToggle>

        </>
      ) : (
        <>
          {admindata.map((item, index) => (
            <>
              <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                  <CImg
                    src={item.img}
                    className="c-avatar-img"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                  header
                  tag="div"
                  color="light"
                  className="text-center"
                >
                  <strong>Account</strong>
                </CDropdownItem>
                <CDropdownItem>
                  <table height="100">
                    <tr>
                      <td>
                        <CImg
                          src={item.img}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td align="center">
                        <h4>{item.username}</h4>
                      </td>
                    </tr>
                  </table>
                </CDropdownItem>
                <CDropdownItem>
                  <table width="100%" height="10">
                    <tr >
                      <td align="center">
                        <CButton color="danger" className="px-4" onClick={() => { history.push(`/login`); reactLocalStorage.set('adminid', null); }}>Logout</CButton>
                      </td>
                    </tr>
                  </table>
                </CDropdownItem>

              </CDropdownMenu>
            </>
          ))}
        </>
      )}



    </CDropdown>
  )
}

export default TheHeaderDropdown
