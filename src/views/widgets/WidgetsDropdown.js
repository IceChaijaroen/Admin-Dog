import React, { useEffect, useState } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'


const WidgetsDropdown = () => {
  const [user, setUser] = useState();
  const [alluser, setAlluser] = useState([]);
  const [doguser, setUserdog] = useState();
  const [doginfo, setDoginfo] = useState();
  const [dogtrain, setDogtrain] = useState();

  const DataDashboard = async () => {
    try {
      const doguser = await axios.get('http://35.187.253.40/admin/dashboard/doguser.php');
      const doginfo = await axios.get('http://35.187.253.40/admin/dashboard/doginfo.php');
      const user = await axios.get('http://35.187.253.40/admin/dashboard/user.php');
      const dogtrain = await axios.get('http://35.187.253.40/admin/dashboard/dogtrain.php');

      setUser(user.data.user);
      setUserdog(doguser.data);
      setDoginfo(doginfo.data);
      setDogtrain(dogtrain.data);
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    DataDashboard();
  });

  console.log(user)

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={user}
          text="ผู้ใช้ทั้งหมด"
          footerSlot={
            <ChartLineSimple
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '20px' }}
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>

      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={doguser}
          text="สุนัขทั้งหมด"
          footerSlot={
            <ChartLineSimple
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '20px' }}
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={doginfo}
          text="สายพันธุ์สุนัขทั้งหมด"
          footerSlot={
            <ChartLineSimple
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '20px' }}
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={dogtrain}
          text="ท่าฝึกทั้งหมด"
          footerSlot={
            <ChartLineSimple
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: '20px' }}
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
