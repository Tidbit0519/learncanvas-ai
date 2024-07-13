import { Router } from "express";
import axios from "axios";

const canvasRouter = Router();
const baseUrl = process.env.CANVAS_API_URL;
const token = "Bearer " + process.env.CANVAS_ACCESS_TOKEN;

canvasRouter.get("/activeCourses", async (req, res) => {
	try {
		const response = await axios.get(
			// `${baseUrl}/courses?per_page=100&enrollment_state=active`,
			`${baseUrl}/courses?per_page=1`,
			{
				headers: {
					Authorization: token,
				},
			}
		);
		res.status(200).send(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});

canvasRouter.get("/:courseId/assignments", async (req, res) => {
    try {
        const response = await axios.get(
            `${baseUrl}/courses/${req.params.courseId}/assignments?per_page=100`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        res.status(200).send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default canvasRouter;
