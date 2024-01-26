import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChartMarker = ({ data }) => {

  const [chartState] = useState({
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        height: 160,
        type: 'line',
        redrawOnWindowResize: true,
        toolbar: {
          show: false,
        },
      },
      colors: ['#284B80'],
      dataLabels: {
        enabled: true,
        offsetY: -10,
        formatter: function (val) {
          return 'RM ' + val.toLocaleString(); 
        },
        background: {
            enabled: false,
        },
        style: {
            fontSize: '12px'
        }
      },
      stroke: {
        curve: 'straight',
        width: 1,
      },
      markers: {
        size: 4,
        colors: ['#284B80'],
        strokeWidth: 0,
      },
      xaxis: {
        type: 'category',
        categories: ['2020', '2021', '2022'],
        position: 'bottom',
        labels: {
          show: true,
          rotate: -90,
          style: {
            fontSize: '12px',
          },
          offsetX: 2,
          offsetY: 0,
        },
      },
      yaxis: {
        show: false,
        title: {
          text: '',
        },
      },
      grid: {
        show: true,
        color: "#75757533",
        padding: {
          top: 10,
          right: 60,
          bottom: 10,
          left: 60,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        show: false,
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
        options={chartState.options}
          series={chartState.series}
          type="line"
          height={160}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChartMarker;
