import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from "axios";

const FeedbackCard = ({ prompt }) => {
    const [feedback, setFeedback] = useState("");

    console.log(prompt);

    useEffect(() => {
        const postFeedback = async () => {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/feedback`,
                    prompt,
                    {
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    }
                );
            }
            catch (error) {
                console.error(error);
            }
        }

            postFeedback();
                
            const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/feedback`);

            eventSource.onmessage = (event) => {
                setFeedback((prev) => prev + event.data + "\n");
            };

            eventSource.onerror = (error) => {
                console.error("EventSource failed:", error);
                eventSource.close();
            };

            return () => {
                eventSource.close();
            };
    }, [])

    return (
        <div>
            <h1>Feedback</h1>
            <p>{feedback}</p>
        </div>
    );
}

FeedbackCard.propTypes = {
    prompt: PropTypes.string.isRequired,
};

export default FeedbackCard;