import { useParams } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";

const Feedback = () => {
    const { courseId, assignmentId } = useParams();

    const prompt = "Hello!! This is a prompt.";

    return <FeedbackCard prompt={prompt} />;
}

export default Feedback;