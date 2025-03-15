import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { ApexOptions } from "apexcharts"; // Import ApexOptions for typing

const EngagementChart: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); // State to track the selected tab (0 for Views, 1 for Course)

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Define chart options with ApexOptions type
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: "100%", // Set to 100% to fill the parent container
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
        formatter: (value: number) => `${value}${tabValue === 0 ? "k" : ""}`, // "k" for Views, empty for Course
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
        formatter: (value: number) => `${value}${tabValue === 0 ? "k" : ""}`, // "k" for Views, empty for Course
      },
    },
    colors: ["#007bff"],
  };

  // Define chart series with proper typing, conditionally based on tab
  const chartSeries: Array<{ name: string; data: number[] }> = [
    {
      name: "Engagement",
      data:
        tabValue === 0
          ? [10, 10, 30, 25, 40, 20, 15]
          : [5, 8, 12, 10, 15, 7, 9], // Example data for Views and Course
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 0, // Straight corners
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
                backgroundColor: "#007bff", // Blue underline for selected tab
            },
            borderBottom: "1px solid gray", // Fix for the border-bottom property
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
            padding: "4px 8px", // Reduced padding
            minHeight: "auto", // Remove default min height
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
            padding: "4px 8px", // Reduced padding
            minHeight: "auto", // Remove default min height
          }}
        />
      </Tabs>
      {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2">{tabValue === 0 ? "24K" : "1.5K"}</Typography>
        <Typography variant="body2">{tabValue === 0 ? "1.5K" : "0.5K"}</Typography>
      </Box> */}
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
