import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CourseCard from './CourseCard';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useAppDispatch } from '../../../../redux/hooks';
import { saveCourseIdToStore } from '../../../../redux/features/course/courseSlice';

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
    const dispatch = useAppDispatch();
    // filtering the courses according to isPublished key
    const publishedCourses = courses.filter((course: any) => course.isPublished === true);
    const unpublishedCourses = courses.filter((course: any) => course.isPublished === false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ width: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box >
                        <h2 style={{ fontSize: "30px", lineHeight: "38px" }}>My Courses</h2>
                    </Box>
                    <Box>
                        <Link to={`/teacher/create-course`} style={{ textDecoration: 'none', color: '#3F3F46' }}>
                            <Button variant='contained' sx={{ width: 'auto', height: '44px', borderRadius: '8px', fontSize: '16px' }}>
                                + Create Course
                            </Button>
                        </Link>
                    </Box>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {/* <Box> */}
                        <Tab label={`My Courses (${publishedCourses.length})`} {...a11yProps(0)} />
                        {/* </Box> */}
                        <Tab label={`Unpublished (${unpublishedCourses.length})`} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box sx={{ width: '100%', height: courses.length > 4 ? 'auto' : '60vh' }}>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            {
                                publishedCourses.map((course, index) => (
                                    <Grid size={3} key={index}
                                        onClick={() => {
                                            dispatch(saveCourseIdToStore({ course_id: course._id }));
                                        }}>
                                        <CourseCard course={course} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box sx={{ width: '100%', height: courses.length > 4 ? 'auto' : '60vh' }}>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            {
                                unpublishedCourses.map((course, index) => (
                                    <Grid size={3} key={index}
                                        onClick={() => {
                                            dispatch(saveCourseIdToStore({ course_id: course._id }));
                                        }}>
                                        <CourseCard course={course} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </CustomTabPanel>
            </Box>
        </>
    );
};

export default Courses;