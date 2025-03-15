import React from "react";
import { Box, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const SalesChart = () => {
  // Sample data for the line chart
  const series = [
    {
      name: "Sales",
      data: [28, 29, 33, 36, 32, 32, 33, 35, 41, 46, 40, 30, 26],
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    colors: ["#dc3545"],
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 1,display:"flex",direction:"row" ,height:"100%" }}>
      <Box >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Sales
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Last 7 days
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          16.5K
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: "#dc3545", fontWeight: "medium", mr: 1 }}
          >
            -3%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            vs last 7 days
          </Typography>
        </Box>
      </Box>

      <Box >
        <Chart options={options} series={series} type="line" height="100%" />
      </Box>
    </Box>
  );
};

export default SalesChart;
