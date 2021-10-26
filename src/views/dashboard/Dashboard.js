import React, { lazy, useState, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import MainChartExample from '../charts/MainChartExample.js'
import { CChartLine, CChartBar, CChartDoughnut } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from 'axios'







const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'


const Dashboard = attributes => {
  const [active, setActive] = useState(new Date().getFullYear());
  const [chart, setChart] = useState([]);
  const [Trainone, setTrainone] = useState([]);
  const [Traintwo, setTraintwo] = useState([]);
  const [yrs, setYrs] = useState(new Date().getFullYear())

  const year = [
    {
      id: 1,
      yrs: new Date().getFullYear() - 3
    },
    {
      id: 2,
      yrs: new Date().getFullYear() - 2
    },
    {
      id: 3,
      yrs: new Date().getFullYear() - 1
    },
    {
      id: 4,
      yrs: new Date().getFullYear()
    }
  ]

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const DataDashboard = async () => {
    try {
      const chart = await axios.get('http://35.187.253.40/admin/dashboard/chartuser.php', {
        params: {
          yrs: yrs
        }
      });
      if (chart.data == null) {
        setChart([{ month: 0, user: 0 }]);
      } else {
        setChart(chart.data);
      }

    } catch (err) {
      alert(err)
    }
  }

  const Piedata = async () => {
    try {
      const trainone = await axios.get('http://35.187.253.40/admin/dashboard/pietrain1.php');
      const traintwo = await axios.get('http://35.187.253.40/admin/dashboard/pietrain2.php');
      if (trainone.data == null) {
        setTrainone([{ month: 0, user: 0 }]);
        setTraintwo(0);
      } else {
        setTrainone(trainone.data);
        setTraintwo(traintwo.data);
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    DataDashboard();
    Piedata();
  }, [yrs]);


  const month = ['ไม่มีข้อมูล', 'มกราคม', 'กุมภาพันธุ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const findindex = chart.map(item => month[(item.month)])


  const defaultDatasets = (() => {
    const data1 = chart.map(item => (item.user))
    return [
      {
        label: 'ผู้ใช้',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      }
    ]
  })()

  const pie1 = Trainone.map(item => (item.sumstep))
  const pie2 = Traintwo.map(item => (item.sumstep))

  const piedata = (() => {
    const data1 = [pie1, pie2, 32]
    return [
      {
        label: 'ผู้ใช้',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#555555'],
        borderWidth: 2,
        data: data1
      }
    ]
  })()

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(20 / 9),
            max: 20
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }
  }
  )()

  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">สถิติการเข้าร่วมของผู้ใช้</h4>
              <div className="small text-muted"></div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">

              <CButtonGroup className="float-right mr-3">
                {
                  year.map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value.id}
                      className="mx-0"
                      active={active === value.yrs}
                      onClick={() => { setActive(value.yrs); setYrs(value.yrs); }}
                    >
                      {value.yrs}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartBar
            {...attributes}
            datasets={defaultDatasets}
            options={defaultOptions}
            labels={findindex}
            style={{ height: '300px', marginTop: '40px' }}
          />
        </CCardBody>
      </CCard>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h2> สถิติในแต่ละท่า </h2>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                datasets={piedata}
                labels={['ฝึกการตั้งตัวเป็นจ่าฝูง', 'ฝึกนั่ง', 'ขอมือ']}
              />

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
