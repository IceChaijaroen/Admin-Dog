import React, { useEffect, useState } from 'react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from 'axios'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'


const MainChartExample = attributes => {
  const [chart, setChart] = useState([]);
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const DataDashboard = async () => {
    try {
      const chart = await axios.get('http://35.187.253.40/admin/dashboard/chartuser.php');
      setChart(chart.data);
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    DataDashboard();
  }, []);


  const month = ['', 'มกราคม', 'กุมภาพันธุ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const findindex = chart.map(item => month[(item.month)])

  console.log(findindex)
  const defaultDatasets = (() => {
    let elements = 27
    const data1 = chart.map(item => (item.user))
    const data2 = []
    const data3 = []
    for (let i = 0; i <= elements; i++) {
      chart.map(item => (item.user))
      data2.push(random(80, 100))
      data3.push(65)
    }
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

  // render
  return (
    <>
      <CChartBar
        {...attributes}
        datasets={defaultDatasets}
        options={defaultOptions}
        labels={findindex}
      />
    </>
  )
}


export default MainChartExample
