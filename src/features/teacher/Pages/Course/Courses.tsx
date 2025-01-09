import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CourseCard from './CourseCard';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Courses = ({ courses }: any) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: "30px", lineHeight: "38px" }}>My Courses</h2>
                    <Link to={`/teacher/create-course`} style={{ textDecoration: 'none', color: '#3F3F46' }}>
                        <Button variant='contained' sx={{ width: '522px', height: '44px', borderRadius: '8px', fontSize: '16px' }}>
                            + Create Course
                        </Button>
                    </Link>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {/* <Box> */}
                        <Tab label={`My Courses ${courses.length}`} {...a11yProps(0)} />
                        {/* </Box> */}
                        <Tab label="Unpublished" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box sx={{ width: '100%', height: courses.length > 4 ? 'auto' : '60vh' }}>
                        <Grid container rowSpacing={15} columnSpacing={2}>
                            {
                                courses.map(course => (
                                    <Grid size={3}>
                                        <CourseCard course={course} />
                                    </Grid>

                                ))
                            }
                        </Grid>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Unpublished
                </CustomTabPanel>
            </Box>
        </>
    );
};

export default Courses;