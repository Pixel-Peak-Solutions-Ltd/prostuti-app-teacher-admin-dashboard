import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AppReportReplyModal = ({ open, onClose, report }) => {
  const [replyText, setReplyText] = useState("");

  // Return early if no report is selected
  if (!report) return null;

  const handleSend = () => {
    // Implement sending logic
    console.log("Sending reply:", replyText);
    setReplyText("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: "8px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h1"
            component="div"
            sx={{ fontWeight: 500, fontSize: "1.5rem" }}
          >
            Reply to Issue
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 2,
            bgcolor: "#fff",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {report.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {report.content}
          </Typography>
        </Box>

        <Box sx={{ p: 2, height: "160px" }}>
          <textarea
            placeholder="Write here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "4px",
              height: "100%",
              resize: "none",
              fontFamily: "inherit",
              fontSize: "14px",
              padding: "5px",
            }}
          />
        </Box>

        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            startIcon={<SendIcon />}
            sx={{
              bgcolor: "#3a86ff",
              "&:hover": { bgcolor: "#2a76ef" },
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "14px",
              px: 3,
            }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AppReportReplyModal;
