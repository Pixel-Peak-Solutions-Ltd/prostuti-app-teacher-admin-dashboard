import React from "react";
import { Box, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useGetLast7DaysSalesQuery } from "../../../../redux/features/adminDashboard/adminDashboardApi";
import Loader from "../../../../shared/components/Loader";

const SalesChart = () => {
  const { data, isLoading } = useGetLast7DaysSalesQuery({});

  if (isLoading) {
    return <Loader />;
  }

  // Sample data for the line chart
  const series = [
    {
      name: "Sales",
      data: data?.data?.dailySales || [0, 0, 0, 0, 0, 0, 0],
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
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        display: "flex",
        direction: "row",
        height: "100%",
      }}
    >
      <Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Sales
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Last 7 days
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
          {data?.data?.totalSales
            ? (data?.data?.totalSales / 1000).toFixed(2) + "K"
            : "0.00K"}
        </Typography>

        {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: "#dc3545", fontWeight: "medium", mr: 1 }}
          >
            -3%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            vs last 7 days
          </Typography>
        </Box> */}
      </Box>

      <Box>
        <Chart options={options} series={series} type="line" height="100%" />
      </Box>
    </Box>
  );
};

export default SalesChart;
