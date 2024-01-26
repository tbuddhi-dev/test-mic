import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = ({ setHorizontal, data }) => {
const setOrientation = setHorizontal ? 'horizontal' : 'vertical';
  const state = {
    series: [{
      name: '',
      data: data
    }],
    options: {
      chart: {
        height: 336,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
            enabled: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: setHorizontal,
          columnWidth: setHorizontal ? '30%' : '50%',
          barHeight: setHorizontal ? '50%': '70%',
          dataLabels: {
            position: 'top', // top, center, bottom
            orientation:  setOrientation,
          },
          barWidth: setHorizontal ? '90%' : '40%',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
            return 'RM ' + val.toLocaleString(); // Format as 'RM 97,625'
        },
        offsetY: setHorizontal ? 6 : -110    ,
        offsetX: setHorizontal ? -50 : 6,
        labels: {
            show: false,
        },
        style: {
          fontSize: '0.875rem',
          colors: ["#ffffff"]
        }
      },
      fill: {
        colors: ['#284B80'],
        type: "gradient",
        gradient: {
          type: setOrientation,
          shadeIntensity: 0.1,
          inverseColors: false,
          opacityFrom: setHorizontal ? 0 : 1,
          opacityTo: setHorizontal ? 1 : 0,
          stops: [0, 99, 100],
        }
      },
      xaxis: {
        categories: ["2020", "2021", "2022"],
        position: 'bottom',
        labels: {
            show: setHorizontal ? false : true,
        },
        grid: {
            show: false, 
          },
        axisBorder: {
            show: false,
        },
      },
      yaxis: {
       show: setHorizontal ? true : false
      },
      grid: {
        show: false,
        xaxis: {
            lines: {
                show: false
            }
        },   
        yaxis: {
            lines: {
                show: false
            }
        },  
      }
    },
  };

  return (
    <div>
      <div id="chart" style={{ marginBottom: setHorizontal ? '-20px' : '0'}}>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={setHorizontal ? '166' : '336'} />
      </div>
    </div>
  );
};

export default ColumnChart;
