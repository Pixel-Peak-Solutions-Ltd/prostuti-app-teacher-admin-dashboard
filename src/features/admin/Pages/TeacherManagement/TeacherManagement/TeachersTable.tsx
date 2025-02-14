import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function createData(si, teacherName, teacherId, subject, category) {
  return { si, teacherName, teacherId, subject, category };
}

// Raw Data
const rows = [
  createData("01.", "Test 01", "TID1001", "Physics", "Academic"),
  createData("02.", "Test 02", "TID1002", "Physics", "Academic"),
  createData("03.", "Test 03", "TID1003", "Physics", "Academic"),
  createData("04.", "Test 04", "TID1004", "Physics", "Academic"),
  createData("05.", "Test 05", "TID1005", "Physics", "Admission"),
  createData("06.", "Test 06", "TID1006", "Physics", "Admission"),
  createData("07.", "Test 07", "TID1007", "Physics", "Admission"),
  createData("08.", "Test 08", "TID1008", "Physics", "Job"),
  createData("09.", "Test 09", "TID1009", "Physics", "Job"),
  createData("10.", "Test 10", "TID1010", "Physics", "Job"),
];

const TeachersTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="teachers-table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#E5E7EB" }}>
            <TableCell>SI</TableCell>
            <TableCell>Teacher Name</TableCell>
            <TableCell>Teacher ID</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.teacherId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{row.si}</TableCell>
              <TableCell>{row.teacherName}</TableCell>
              <TableCell>{row.teacherId}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <IconButton aria-label="action">
                  <ArrowForwardIosIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeachersTable;
