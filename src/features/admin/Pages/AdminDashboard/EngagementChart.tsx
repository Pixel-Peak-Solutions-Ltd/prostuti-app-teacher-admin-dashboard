import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { ApexOptions } from "apexcharts"; 

const EngagementChart: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); 

  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: "100%", 
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#888",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 5,
      labels: {
        formatter: (value: number) => `${value}${tabValue === 0 ? "k" : ""}`, 
        style: {
          colors: "#888",
        },
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}${tabValue === 0 ? "k" : ""}`, 
      },
    },
    colors: ["#007bff"],
  };

 
  const chartSeries: Array<{ name: string; data: number[] }> = [
    {
      name: "Engagement",
      data:
        tabValue === 0
          ? [10, 10, 30, 25, 40, 20, 15]
          : [5, 8, 12, 10, 15, 7, 9], 
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 0, 
        boxShadow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
        Course Engagement
      </Typography>
      <Typography variant="body2" gutterBottom>
        Last 7 days
      </Typography>
    <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
            mt: 6,
            mb: 6,
            "& .MuiTabs-indicator": {
                backgroundColor: "#007bff", 
            },
            borderBottom: "1px solid gray", 
            width:"fit-content"
        }}
    >
        <Tab
          label={
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: tabValue === 0 ? "600" : "400",
                }}
              >
                Views
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  color:  "#888",
                  mt:1
                }}
              >
                24K
              </Typography>
            </Box>
          }
          sx={{
            textTransform: "none",
            padding: "4px 8px", 
            minHeight: "auto", 
          }}
        />
        <Tab
          label={
            <Box sx={{ textAlign: "center" }} >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: tabValue === 1 ? "600" : "400",
                }}
              >
                Course
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  color:  "#888",
                  mt:1
                }}
              >
                1.5K
              </Typography>
            </Box>
          }
          sx={{
            textTransform: "none",
            padding: "4px 8px", 
            minHeight: "auto", 
          }}
        />
      </Tabs>
     
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default EngagementChart;
