import { useParams } from "react-router-dom";

const ViewAsSubmission = () => {
    const { assignmentHistoryId } = useParams();
    return (
        <div>{assignmentHistoryId}</div>
    );
};

export default ViewAsSubmission;