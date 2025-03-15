import React, { useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const PracticeTestStats = () => {
  const [activeFilter, setActiveFilter] = useState('monthly');
  
  // Sample data for different time periods
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Data for all filters
  const chartData = {
    monthly: {
      series1: [350, 155, 160, 350, 465, 370, 385, 195, 405, 315, 25, 435],
      series2: [250, 155, 345, 250, 260, 370, 175, 285, 190, 295, 300, 310]
    },
    weekly: {
      series1: [380, 100, 420, 230],
      series2: [175, 285, 295, 205]
    },
    daily: {
      series1: [420, 125, 230, 425, 135, 140, 445],
      series2: [295, 100, 305, 200, 310, 415, 320]
    }
  };
  
  // X-axis categories based on filter
  const categories = {
    monthly: months,
    weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  const chartOptions:ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#1E88E5', '#90CAF9'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['#f8f9fa', 'transparent'],
        opacity: 0.5
      }
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: categories[activeFilter],
      labels: {
        style: {
          colors: '#777',
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: 100,
      max: 500,
      tickAmount: 5,
      labels: {
        style: {
          colors: '#777',
          fontSize: '12px'
        },
        formatter: function(val) {
          return val.toFixed(0);
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100]
      }
    }
  };

  const series = [
    {
      name: 'Top Score',
      data: chartData[activeFilter].series1
    },
    {
      name: 'Average Score',
      data: chartData[activeFilter].series2
    }
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: '600' }}>Practice Test Statics</Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button
            sx={{
              bgcolor: activeFilter === 'monthly' ? '#1a73e8' : 'transparent',
              color: activeFilter === 'monthly' ? 'white' : '#333',
              borderColor: '#1a73e8',
              textTransform: 'none',
              '&:hover': { bgcolor: activeFilter === 'monthly' ? '#1565c0' : 'rgba(25, 118, 210, 0.04)' }
            }}
            onClick={() => handleFilterChange('monthly')}
          >
            Monthly
          </Button>
          <Button
            sx={{
              bgcolor: activeFilter === 'weekly' ? '#1a73e8' : 'transparent',
              color: activeFilter === 'weekly' ? 'white' : '#333',
              borderColor: '#1a73e8',
              textTransform: 'none',
              '&:hover': { bgcolor: activeFilter === 'weekly' ? '#1565c0' : 'rgba(25, 118, 210, 0.04)' }
            }}
            onClick={() => handleFilterChange('weekly')}
          >
            Weekly
          </Button>
          <Button
            sx={{
              bgcolor: activeFilter === 'daily' ? '#1a73e8' : 'transparent',
              color: activeFilter === 'daily' ? 'white' : '#333',
              borderColor: '#1a73e8',
              textTransform: 'none',
              '&:hover': { bgcolor: activeFilter === 'daily' ? '#1565c0' : 'rgba(25, 118, 210, 0.04)' }
            }}
            onClick={() => handleFilterChange('daily')}
          >
            Daily
          </Button>
        </ButtonGroup>
      </Box>
      
      <Box sx={{ mt: 2, height: 300, bgcolor: '#f8f9fa', borderRadius: 1, p: 1 }}>
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default PracticeTestStats;