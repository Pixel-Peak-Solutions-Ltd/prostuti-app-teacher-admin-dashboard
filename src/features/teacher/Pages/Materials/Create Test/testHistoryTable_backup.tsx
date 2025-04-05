// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Loader from '../../../../../shared/components/Loader';


// interface Column {
//     id: 'sl' | 'student_name' | 'student_id' | 'marks' | 'submission_date' | 'action';
//     label: string;
//     minWidth?: number;
//     align?: 'right';
//     // format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//     { id: 'sl', label: 'Sl', minWidth: 170 },
//     { id: 'student_name', label: 'Student Name', minWidth: 100 },
//     {
//         id: 'student_id',
//         label: 'Student ID',
//         minWidth: 170,
//         align: 'right',
//         // format: (value: number) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'marks',
//         label: 'Marks',
//         minWidth: 170,
//         align: 'right',
//         // format: (value: number) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'submission_date',
//         label: 'Submission Date',
//         minWidth: 170,
//         align: 'right',
//         // format: (value: number) => value.toFixed(2),
//     },
//     {
//         id: 'action',
//         label: 'Action',
//         minWidth: 170,
//         align: 'right',
//         // format: (value: number) => value.toFixed(2),
//     },
// ];

// interface Data {
//     sl: string;
//     student_name: string;
//     marks: number;
//     submission_date: Date;
//     action: any;
// }

// function createData(
//     sl: string,
//     student_name: string,
//     marks: number,
//     submission_date: Date,
//     action: any
// ): Data {
//     // const density = population / size;
//     return { sl, student_name, marks, submission_date, action };
// }

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function TestHistoryTable({ testHistoryData, isLoading }: { testHistoryData: any; isLoading: boolean; }) {

//     if (isLoading) {
//         <Loader />;
//     }

//     console.log('test history data:', testHistoryData);
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);


//     // console.log(data?.data);
//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     return (
//         <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
//             <TableContainer sx={{ maxHeight: '70vh' }}>
//                 <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                         <TableRow >
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align={column.align}
//                                     style={{ minWidth: column.minWidth }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows
//                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((row) => {
//                                 return (
//                                     <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                                         {columns.map((column) => {
//                                             const value = row[column.id];
//                                             return (
//                                                 <TableCell key={column.id} align={column.align}>
//                                                     {column.format && typeof value === 'number'
//                                                         ? column.format(value)
//                                                         : value}
//                                                 </TableCell>
//                                             );
//                                         })}
//                                     </TableRow>
//                                 );
//                             })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// }
