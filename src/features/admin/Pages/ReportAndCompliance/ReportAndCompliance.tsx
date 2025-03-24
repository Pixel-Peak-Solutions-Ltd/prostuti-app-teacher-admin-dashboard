import { Box, Grid2, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Question } from "./Question/Question";
import { App } from "./App/App";

const ReportAndCompliance = () => {
  const [activeTab, setActiveTab] = useState<"question" | "app">("question");

  const handleTabChange = () => {
    if (activeTab === "question") {
      setActiveTab("app");
    } else {
      setActiveTab("question");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Paper
        variant="outlined"
        sx={{ width: "100%", height: "100vh", borderRadius: "10px", p: 3 }}
      >
        {/* top title and button section */}
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h3">Report And Compliance</Typography>
        </Box>

        {/* Tab section */}
        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Grid2 container spacing={2} sx={{ mt: 3 }}>
            <Grid2 size={12}>
              <Grid2 size={4}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab value="question" label="Question" />
                  <Tab value="app" label="APP" />
                </Tabs>
              </Grid2>
            </Grid2>
          </Grid2>
          {/* Tab content */}
          {activeTab === "question" ? <Question /> : <App />}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReportAndCompliance;
