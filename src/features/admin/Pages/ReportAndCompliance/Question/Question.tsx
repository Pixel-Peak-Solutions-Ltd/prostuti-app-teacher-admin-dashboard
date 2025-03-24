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

const reports = [
  { report: "Question......", reportId: "TD001", type: "Academy" },
  { report: "Question......", reportId: "TD002", type: "Academy" },
  { report: "Question......", reportId: "TD003", type: "Academy" },
  { report: "Question......", reportId: "TD004", type: "Academy" },
];

export const Question = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleClick = (event, report) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  const handleReply = () => {
    console.log("Replying to:", selectedReport);
    handleClose();
  };

  const handleDelete = () => {
    console.log("Deleting:", selectedReport);
    handleClose();
  };

  return (
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
              key={report.reportId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ width: "5%" }}>{`${index + 1}.`}</TableCell>
              <TableCell sx={{ width: "40%" }}>{report.report}</TableCell>
              <TableCell sx={{ width: "15%" }}>{report.reportId}</TableCell>
              <TableCell sx={{ width: "20%" }}>{report.type}</TableCell>
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleReply}>Reply</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </TableContainer>
  );
};
