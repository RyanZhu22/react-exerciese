import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function Bar ({ style, xData, sData, title }) {
  const domRef = useRef()
  const chartInit = () => {
    const myChart = echarts.init(domRef.current)
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: sData
        }
      ]
    })
  }
  
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}



export default Bar