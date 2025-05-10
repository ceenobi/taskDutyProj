import express, { json } from "express";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors"
import userRoutes from "./routes/user.js";
import notesRoutes from "./routes/note.js";

const app = express();
app.use(cors())
app.use(json({ limit: "25mb" })); //parses requests in json body format -
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

//route
app.get("/", (req, res) => {
  res.send("Hello express");
});
//api routes
app.use("/api/auth", userRoutes);
app.use("/api/notes", notesRoutes);

//endpoint error routes
app.use((req, res, next) => {
  next(createHttpError(400, "Endpoint not found"));
});

//general/specific api error
app.use((error, req, res, next) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "An unknown error has occured";
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
