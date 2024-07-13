import { useParams } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";

const Feedback = () => {
    const { assignmentId } = useParams();

    return <FeedbackCard prompt={assignmentId} />;
}

export default Feedback;