import jwt from "jsonwebtoken";
import { Token } from "../model/index.js";

const authenticateCanvasToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tokenObj = await Token.findById(decoded.tokenId);
    if (!tokenObj) return res.sendStatus(403);

    req.canvasToken = tokenObj.canvasToken;
    req.domainUrl = tokenObj.domainUrl;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export default authenticateCanvasToken;
