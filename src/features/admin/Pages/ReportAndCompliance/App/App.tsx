import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import AppReportReplyModal from "./AppReportReplayModal";

const reports = [
  {
    id: 1,
    name: "Maria Ahmed",
    sid: "SID1009",
    title: "App can be improved",
    content:
      "This blog post has been published. Team members will be able to edit this post and republish changes.",
    avatar: "https://i.pravatar.cc/100",
  },
  {
    id: 2,
    name: "Maria Ahmed",
    sid: "SID1009",
    title: "App can be improved",
    content:
      "This blog post has been published. Team members will be able to edit this post and republish changes.",
    avatar: "https://i.pravatar.cc/100",
  },
  {
    id: 3,
    name: "Maria Ahmed",
    sid: "SID1009",
    title: "App can be improved",
    content:
      "This blog post has been published. Team members will be able to edit this post and republish changes.",
    avatar: "https://i.pravatar.cc/100",
  },
  {
    id: 4,
    name: "Maria Ahmed",
    sid: "SID1009",
    title: "App can be improved",
    content:
      "This blog post has been published. Team members will be able to edit this post and republish changes.",
    avatar: "https://i.pravatar.cc/100",
  },
  {
    id: 5,
    name: "Maria Ahmed",
    sid: "SID1009",
    title: "App can be improved",
    content:
      "This blog post has been published. Team members will be able to edit this post and republish changes.",
    avatar: "https://i.pravatar.cc/100",
  },
  {
    id: 6,
    name: "Maria Ahmed",
    sid: "SID1009",
    title: "App can be improved",
    content:
      "This blog post has been published. Team members will be able to edit this post and republish changes.",
    avatar: "https://i.pravatar.cc/100",
  },
];

export const App = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container spacing={2} columns={12}>
        {reports.map((report) => (
          <Grid key={report.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ padding: 2, borderRadius: "10px", boxShadow: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar src={report.avatar} alt={report.name} />
                  <Box>
                    <Typography fontWeight={600}>{report.name}</Typography>
                    <Typography variant="caption" color="gray">
                      {report.sid}
                    </Typography>
                  </Box>
                </Box>
                <IconButton color="error">
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
              <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Typography fontWeight={600}>{report.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {report.content}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleOpenModal(report)}
                >
                  Reply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <AppReportReplyModal
        open={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport}
      />
    </Box>
  );
};
