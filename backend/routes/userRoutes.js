import { Router } from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
