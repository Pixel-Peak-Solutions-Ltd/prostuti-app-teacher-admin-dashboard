import React from "react";
import Chart from "react-apexcharts";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { ApexOptions } from "apexcharts";
import {
  useGetAssignmentCompletionQuery,
  useGetTestCompletionQuery,
} from "../../../../redux/features/adminDashboard/adminDashboardApi";
import Loader from "../../../../shared/components/Loader";

const CompletionRate = () => {
  const { data: test, isLoading: isLoadingTest } = useGetTestCompletionQuery(
    {}
  );
  const { data: assignment, isLoading: isloadingAssignment } =
    useGetAssignmentCompletionQuery({});

  if (isLoadingTest || isloadingAssignment) {
    return <Loader />;
  }

  // Data for test completion

  const {
    submittedPercentage: submittedPercentageTest,
    unsubmittedPercentage: unsubmittedPercentageTest,
  } = test.data;

  const testSeries = [
    parseFloat(unsubmittedPercentageTest.replace("%", "")),
    parseFloat(submittedPercentageTest.replace("%", "")),
  ];
  const testLabels = ["Absent", "Present"];

  // Data for assignment completion

  const {
    submittedPercentage: submittedPercentageAssignment,
    unsubmittedPercentage: unsubmittedPercentageAssignment,
  } = assignment.data;

  const assignmentSeries = [
    parseFloat(unsubmittedPercentageAssignment.replace("%", "")),
    parseFloat(submittedPercentageAssignment.replace("%", "")),
  ];
  const assignmentLabels = ["Not Submitted", "Submitted"];

  // Common chart options
  const chartOptions: ApexOptions = {
    labels: [],
    colors: ["#90caf9", "#1e88e5"],
    legend: {
      position: "right",
      fontSize: "14px",
      offsetY: 40,
      offsetX: 40,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#fff"],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "0%",
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "600", mb: 3 }}>
        Test & Assignment Completion Rate
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: "600", mb: 2 }}
            >
              Overall Test Completion
            </Typography>
            <Chart
              options={{ ...chartOptions, labels: testLabels }}
              series={testSeries}
              type="pie"
              height={320}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: "600", mb: 2 }}
            >
              Overall Assignment Completion
            </Typography>
            <Chart
              options={{ ...chartOptions, labels: assignmentLabels }}
              series={assignmentSeries}
              type="pie"
              height={320}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompletionRate;
