import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Question } from "./Question/Question";
import { App } from "./App/App";

const ReportAndCompliance = () => {
  const [activeTab, setActiveTab] = useState<"question" | "app">("question");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: "question" | "app"
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Paper
        variant="outlined"
        sx={{ width: "100%", height: "100vh", borderRadius: "10px", p: 3 }}
      >
        {/* Title Section */}
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

        {/* Tabs Section */}
        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            {/* Question Tab */}
            <Tab
              value="question"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography>Question</Typography>
                  <Box
                    sx={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor:
                        activeTab === "question" ? "#1976d2" : "transparent",
                      color: activeTab === "question" ? "#fff" : "#757575",
                      border:
                        activeTab === "question" ? "none" : "1px solid #ddd",
                    }}
                  >
                    10
                  </Box>
                </Box>
              }
            />

            {/* App Tab */}
            <Tab
              value="app"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography>App</Typography>
                  <Box
                    sx={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor:
                        activeTab === "app" ? "#1976d2" : "transparent",
                      color: activeTab === "app" ? "#fff" : "#757575",
                      border: activeTab === "app" ? "none" : "1px solid #ddd",
                    }}
                  >
                    6
                  </Box>
                </Box>
              }
            />
          </Tabs>

          {/* Tab Content */}
          {activeTab === "question" ? <Question /> : <App />}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReportAndCompliance;
