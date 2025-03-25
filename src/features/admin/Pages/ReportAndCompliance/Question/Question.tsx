import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportReplyModal from "../ReportReplayModal/ReportReplayModal";

const reports = [
  {
    teacher: {
      id: 1,
      teacherId: "TD001",
      type: "Academy",
    },
    report: {
      id: 11,
      title: "App can be improved 1",
      content: "Question...........",
    },
  },
  {
    teacher: {
      id: 2,
      teacherId: "TD002",
      type: "Academy",
    },
    report: {
      id: 22,
      title: "App can be improved",
      content: "Question...........",
    },
  },
  {
    teacher: {
      id: 3,
      teacherId: "TD003",
      type: "Academy",
    },
    report: {
      id: 33,
      title: "App can be improved",
      content: "Question...........",
    },
  },
  {
    teacher: {
      id: 4,
      teacherId: "TD004",
      type: "Job",
    },
    report: {
      id: 44,
      title: "App can be improved",
      content: "Question...........",
    },
  },
  {
    teacher: {
      id: 5,
      teacherId: "TD005",
      type: "Job",
    },
    report: {
      id: 55,
      title: "App can be improved",
      content: "Question...........",
    },
  },
  {
    teacher: {
      id: 6,
      teacherId: "TD006",
      type: "Job",
    },
    report: {
      id: 66,
      title: "App can be improved",
      content: "Question...........",
    },
  },
];

export const Question = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (event, report) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReply = () => {
    setModalOpen(true); // Open modal when Reply is clicked
    handleClose();
  };

  const handleDelete = () => {
    console.log("Deleting:", selectedReport);
    handleClose();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", margin: "auto", marginTop: "20px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="teachers-table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E5E7EB" }}>
              <TableCell sx={{ width: "5%" }}>SI</TableCell>
              <TableCell sx={{ width: "40%" }}>Report</TableCell>
              <TableCell sx={{ width: "15%" }}>Report ID</TableCell>
              <TableCell sx={{ width: "20%" }}>Type</TableCell>
              <TableCell sx={{ width: "10%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={report.report.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "5%" }}>{`${index + 1}.`}</TableCell>
                <TableCell sx={{ width: "40%" }}>
                  {report.report.content}
                </TableCell>
                <TableCell sx={{ width: "15%" }}>
                  {report.teacher.teacherId}
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {report.teacher.type}
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <IconButton
                    onClick={(event) => handleClick(event, report)}
                    aria-label="action"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleReply}>Reply</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </TableContainer>

      {/* Modal Component */}
      <ReportReplyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        report={selectedReport?.report}
      />
    </>
  );
};
