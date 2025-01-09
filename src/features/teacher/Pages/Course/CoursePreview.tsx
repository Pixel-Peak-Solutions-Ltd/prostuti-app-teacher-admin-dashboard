import { useParams } from "react-router-dom";

const CoursePreview = () => {
    const { courseId } = useParams();
    return (
        <div>{courseId}</div>
    );
};

export default CoursePreview;