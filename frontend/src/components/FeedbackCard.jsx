import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import axios from "axios";

const FeedbackCard = ({ prompt }) => {

    return (
        <div>
            <h1>Feedback</h1>
            <p>I just got a prompt from assignment id: {prompt}</p>
        </div>
    );
}

FeedbackCard.propTypes = {
    prompt: PropTypes.string.isRequired,
};

export default FeedbackCard;