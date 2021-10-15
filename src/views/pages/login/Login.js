import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  function Submit() {
    const article = {
      username: username,
      password: password,
    };
    axios.get('http://35.187.253.40/admin/login.php', {
      params: {
        username: username,
        password: password,
      }
    })
      .then(res => {
        if (res.data.onLogin == true) {
          reactLocalStorage.set('adminid', res.data.adminID)
          history.push(`/`)
        } else {
          alert(res.data);
        }

      })
      .catch(err => {
        alert(err);
      })
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{ backgroundImage: 'url("img/3114610.jpg")' }}>
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to Admin account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="success" className="px-4" onClick={(e) => Submit(e)}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard >

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
