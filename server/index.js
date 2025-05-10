import app from "./src/app.js";
import connectToDb from "./src/config/mongoDb.js";

const PORT = process.env.PORT || 4000;

if (!PORT || !process.env.MONGODB_URI) {
  throw new Error(
    "Please ensure there is a port number and MONGODB_URI key provided"
  );
}

connectToDb()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.error("Invalid database connection", error);
  });

function startServer() {
  app.listen(PORT, (error) => {
    if (error) {
      console.error("Cannot connect to server", error);
    } else {
      console.log(`Server is connected to port ${PORT}`);
    }
  });
}
