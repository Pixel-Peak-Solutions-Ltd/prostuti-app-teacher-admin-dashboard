import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { OutletContextType } from "./CreateCourse";
import CoursePreview from "./CoursePreview";
import { useAppSelector } from "../../../../redux/hooks";
import Loader from "../../../../shared/components/Loader";

// This wrapper ensures the stepper is set correctly when viewing the preview
// within the course creation flow
const CoursePreviewInCreateFlow = () => {
    const { setActiveSteps } = useOutletContext<OutletContextType>();
    const navigate = useNavigate();

    // Get course_id from Redux store
    const course_id = useAppSelector(state => state.courseAndLessonId.id.course_id);

    // Set stepper to final step (3) when component mounts
    useEffect(() => {
        setActiveSteps(3);

        // If course_id is not available, redirect back to the course list
        if (!course_id) {
            console.error("Course ID not found in store. Redirecting back to course list.");
            navigate('/teacher/my-course');
        }
    }, [setActiveSteps, course_id, navigate]);

    // Show loader while checking for course_id
    if (!course_id) {
        return <Loader />;
    }

    // Pass the courseId parameter and hide the back button
    return (
        <div key={course_id}>
            <CoursePreview courseId={course_id} hideBackButton={true} />
        </div>
    );
};

export default CoursePreviewInCreateFlow;