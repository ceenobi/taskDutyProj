import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "You are unauthorized"));
  }
  //verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) => {
    if (err) {
      return next(createHttpError(403, "Broken or expired token"));
    }
    //assign decodedUser to our request handler
    req.user = decodedUser;
    //pass to the nexthandler for the next action
    next();
  });
};

export default verifyToken
