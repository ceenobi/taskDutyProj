import Note from "../model/note.js";
import User from "../model/user.js";
import createHttpError from "http-errors";

export const createNote = async (req, res, next) => {
  const userId = req.user.id; //get logged in user
  const { title, description, tag } = req.body; //get formfields
  if (!title || !description || !tag) {
    return next(createHttpError(400, "Form fields are missing"));
  }
  try {
    const note = await Note.create({
      userId: userId,
      title: title,
      description: description,
      tag: tag,
    });
    res.status(201).json({ msg: "Note created", note });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ _id: -1 });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getUserNotes = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const notes = await Note.find({ userId: userId });
    if (!notes) {
      return next(createHttpError(404, "Notes not found"));
    }
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getASingleNote = async (req, res, next) => {
  const { noteId } = req.params;
  if (!noteId) {
    return next(createHttpError(400, "Note id params is missing"));
  }
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const editANote = async (req, res, next) => {
  const { id: noteId } = req.params;
  const { id: userId } = req.user;
  const { title, description, tag } = req.body;
  if (!noteId) {
    return next(createHttpError(400, "Note id params is missing"));
  }
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }
    if (note.userId.toString() !== userId) {
      return next(createHttpError(403, "Unauthorized to edit this note"));
    }
    const updatedNote = {
      title: title || note.title,
      description: description || note.description,
      tag: tag || note.tag,
    };
    const newNote = await Note.findByIdAndUpdate(noteId, updatedNote, {
      new: true,
    });
    res.status(200).json({ msg: "Note updated", note: newNote });
  } catch (error) {
    next(error);
  }
};

export const deleteANote = async (req, res, next) => {
  const { id: noteId } = req.params;
  const { id: userId } = req.user; 
  
  if (!noteId) {
    return next(createHttpError(400, "Note id params is missing"));
  }
  try {
    const note = await Note.findByIdAndDelete(noteId);
    
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }
    if (note.userId.toString() !== userId) {
      return next(createHttpError(403, "Unauthorized to delete this note"));
    }
    await Note.deleteOne();
    res.status(200).json({ msg: "Note deleted" });
  } catch (error) {
    next(error);
  }
};
