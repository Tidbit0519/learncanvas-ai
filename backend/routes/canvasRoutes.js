import { Router } from "express";
import axios from "axios";

const canvasRouter = Router();

canvasRouter.get("/active", async (req, res) => {
    const baseUrl = process.env.CANVAS_API_URL;
    const token = "Bearer " + process.env.CANVAS_ACCESS_TOKEN;

    try {
        const response = await axios.get(
			`${baseUrl}/courses?per_page=100&enrollment_state=active`,
			{
				headers: {
					Authorization: token,
				},
			}
		);
        res.status(200).send(response.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default canvasRouter;