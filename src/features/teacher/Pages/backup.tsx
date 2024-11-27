// {/* profile information section */ }
// <Box component="section" sx={{ mt: 3, flexGrow: 1, }}>
//     <Typography variant="h5" sx={{ fontWeight: "600" }}>Generals</Typography>
//     <Grid container spacing={2} sx={{ mt: 3, }}>
//         <Grid size={6}>
//             <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Email</Typography>
//             <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
//                 <Typography variant="subtitle1" color="grey.500">asrafuzzaman@gmail.com</Typography>
//             </Card>
//         </Grid>
//         <Grid size={6}>
//             <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Contact Number</Typography>
//             <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
//                 <Typography variant="subtitle1" color="grey.500">+88012345678</Typography>
//             </Card>
//         </Grid>
//         <Grid size={4}>
//             <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Joined Date</Typography>
//             <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
//                 <Typography variant="subtitle1" color="grey.500">January 09, 2024</Typography>
//             </Card>
//         </Grid>
//         <Grid size={4}>
//             <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Subject</Typography>
//             <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
//                 <Typography variant="subtitle1" color="grey.500">Physics</Typography>
//             </Card>
//         </Grid>
//         <Grid size={4}>
//             <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Type</Typography>
//             <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
//                 <Typography variant="subtitle1" color="grey.500">Job</Typography>
//             </Card>
//         </Grid>
//     </Grid>
//     <Divider sx={{ mt: 3 }} />
// </Box>


// date picker

{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateField
        size="small"
        defaultValue={dayjs('04-17-2022')}
        // defaultValue={joinedDate || ''}
        format="LL"
        fullWidth
        // onChange={handleInput}
        onChange={handleDateChange}
        sx={{
            mt: 0.8,
            "& .MuiOutlinedInput-root": {
                color: "grey.500",
                "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                }
            }
        }}
    />
</LocalizationProvider> */}

// //^ handling dayjs for date field
// const handleDateChange = (date: Dayjs | null) => {
//     if (date) {
//         const selectedDate = date.format("YYYY-MM-DD");
//         const month = selectedDate.slice(5, 7);
//         const day = selectedDate.slice(8, 10);
//         const year = selectedDate.slice(0, 4);
//         let formattedDate: string;
//         for (const [key, val] of Object.entries(dateFormat)) {
//             if (key === month) {
//                 formattedDate = `${val} ${day},${year}`;
//                 console.log(formattedDate);
//             }
//         }
//         setProfileData({ ...profileData, joinedDate: date.format("YYYY-MM-DD") }); // Adjust the format as needed
//     }
// };

// record class dynamic url upload field
// {
// Array.from(Array(videoFields)).map((index) =>
// (
//     <>
//         <Grid key={index} size={12}>
//             <CustomLabel fieldName="Upload Video Class" />
//             <CustomTextField
//                 name='classVideoURL' placeholder="Enter Video Link Here"
//                 handleInput={handleRecordDetailsInput}
//                 value={recordDetails?.classVideoURL}
//                 handlePaste={handleOnPaste}
//                 multiline={true} rows={4}
//             />
//         </Grid>
{/* <Grid size={1} sx={{ alignSelf: 'flex-end' }}>
                                                <Button
                                                    onClick={() => {
                                                        if (videoFields > 1) setVideoFields(prev => prev - 1);
                                                        // deleting the corresponding fields
                                                        // delete lessonData[`number_${index + 1}`];
                                                        // delete lessonData[`name_${index + 1}`];
                                                    }}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        height: '40px', minHeight: '40px', width: '100%', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46",
                                                        '&:hover': {
                                                            backgroundColor: '#e91e63',
                                                            color: '#FFF',
                                                            border: 'none'
                                                        }
                                                    }}>
                                                    <DeleteOutlinedIcon />
                                                </Button>
                                            </Grid> */}
//     </>

// )
// )
// }