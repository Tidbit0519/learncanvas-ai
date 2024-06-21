import { useParams } from "react-router-dom";

const SubmissionById = () => {
    const { submissionId } = useParams();

    return (
        <div>
            <h1>Submission By ID</h1>
            <p>Submission ID: {submissionId}</p>
        </div>
    )
}

export default SubmissionById;