import express from 'express'
import { verifyToken } from "../middlewares/verifyToken.js";
import { addComment, deleteComment, getComments } from '../controllers/comment.js';

const router = express.Router();

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

export default router;