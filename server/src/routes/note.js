import express from "express";
import {
  createNote,
  getAllNotes,
  getUserNotes,
  getASingleNote,
  editANote,
  deleteANote
} from "../controller/note.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.get("/get", verifyToken, getAllNotes);
router.get("/user", verifyToken, getUserNotes);
router.get("/get/:noteId", verifyToken, getASingleNote);
router.patch("/:id", verifyToken, editANote )
router.delete("/:id", verifyToken, deleteANote)

export default router;
