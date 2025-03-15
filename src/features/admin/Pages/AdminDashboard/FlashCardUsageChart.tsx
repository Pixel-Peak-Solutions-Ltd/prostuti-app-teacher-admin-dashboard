import React, { useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const FlashcardUsageChart = () => {
  const [activeFilter, setActiveFilter] = useState('monthly');
  
  // Sample data for different time periods
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Data for all filters - in a real app this would come from your API
  const chartData = {
    monthly: {
      academic: [450, 260, 270, 265, 260, 270, 280, 270, 275, 270, 265, 270],
      admission: [400, 410, 420, 415, 410, 415, 425, 415, 220, 415, 410, 420],
      job: [150, 160, 165, 455, 150, 155, 165, 155, 460, 155, 150, 160]
    },
    weekly: {
      academic: [100, 60, 85, 108],
      admission: [90, 95, 100, 92],
      job: [35, 38, 42, 36]
    },
    daily: {
      academic: [54, 40, 39, 91, 30, 29, 48],
      admission: [13, 15, 14, 16, 15, 14, 13],
      job: [15, 36, 53, 73, 36, 15, 34]
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
      type: 'bar',
      toolbar: {
        show: false
      },
      stacked: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 2,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    colors: ['#90CAF9', '#1E88E5', '#0D47A1'],
    xaxis: {
      categories: categories[activeFilter],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      max: 500,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        }
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center'
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(0);
        }
      }
    }
  };

  const series = [
    {
      name: 'Academic',
      data: chartData[activeFilter].academic
    },
    {
      name: 'Admission',
      data: chartData[activeFilter].admission
    },
    {
      name: 'Job',
      data: chartData[activeFilter].job
    }
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: '600' }}>Usage of Flashcard</Typography>
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
      
      <Box sx={{ mt: 2, height: 300 }}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default FlashcardUsageChart;