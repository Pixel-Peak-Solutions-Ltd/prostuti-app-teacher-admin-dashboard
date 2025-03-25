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
import ReportReplyModal from "../ReportReplayModal/ReportReplayModal";

const reports = [
  {
    student: {
      id: 1,
      name: "Maria Ahmed",
      sid: "SID1009",
      avatar: "https://i.pravatar.cc/100",
    },
    report: {
      id: 11,
      title: "App can be improved",
      content:
        "This blog post has been published. Team members will be able to edit this post and republish changes.",
    },
  },
  {
    student: {
      id: 2,
      name: "Ali Hossain",
      sid: "SID1010",
      avatar: "https://i.pravatar.cc/100",
    },
    report: {
      id: 22,
      title: "App can be improved",
      content:
        "This blog post has been published. Team members will be able to edit this post and republish changes.",
    },
  },
  {
    student: {
      id: 3,
      name: "Tamanna Islam",
      sid: "SID1011",
      avatar: "https://i.pravatar.cc/100",
    },
    report: {
      id: 33,
      title: "App can be improved",
      content:
        "This blog post has been published. Team members will be able to edit this post and republish changes.",
    },
  },
  {
    student: {
      id: 4,
      name: "Mahafujur Rahaman",
      sid: "SID1022",
      avatar: "https://i.pravatar.cc/100",
    },
    report: {
      id: 44,
      title: "App can be improved",
      content:
        "This blog post has been published. Team members will be able to edit this post and republish changes.",
    },
  },
  {
    student: {
      id: 5,
      name: "Mehedi Hasan",
      sid: "SID1023",
      avatar: "https://i.pravatar.cc/100",
    },
    report: {
      id: 55,
      title: "App can be improved",
      content:
        "This blog post has been published. Team members will be able to edit this post and republish changes.",
    },
  },
  {
    student: {
      id: 6,
      name: "Mehedi Hasan",
      sid: "SID1023",
      avatar: "https://i.pravatar.cc/100",
    },
    report: {
      id: 66,
      title: "App can be improved",
      content:
        "This blog post has been published. Team members will be able to edit this post and republish changes.",
    },
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
          <Grid key={report.report.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ padding: 2, borderRadius: "10px", boxShadow: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={report.student.avatar}
                    alt={report.student.name}
                  />
                  <Box>
                    <Typography fontWeight={600}>
                      {report.student.name}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {report.student.sid}
                    </Typography>
                  </Box>
                </Box>
                <IconButton color="error">
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
              <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Typography fontWeight={600}>{report.report.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {report.report.content}
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
      <ReportReplyModal
        open={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport?.report}
      />
    </Box>
  );
};
