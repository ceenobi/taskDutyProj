import User from "../model/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";

export const registerUser = async (req, res, next) => {
  const { email, username, password } = req.body; //receives form info from client
  if (!email || !username || !password) {
    return next(createHttpError(400, "Formfields must be filled"));
  }
  try {
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return next(createHttpError(400, "Email already exists"));
    }
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      return next(createHttpError(400, "Username already exists"));
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10); //encyption mechanism
    const hashPassword = await bcrypt.hash(password, salt); //encrypts the pasword
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    //generate accessToken
    const accessToken = generateToken(user._id);
    res.status(201).json({ msg: "User signup successfull", accessToken });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(createHttpError(400, "Username or password is missing"));
  }
  try {
    //find user in db
    const user = await User.findOne({ username: username }).select("+password"); //this will make the password field visible;
    if (!user) {
      return next(createHttpError(404, "User account not found"));
    }
    //handle password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }
    //generate accessToken
    const accessToken = generateToken(user._id);
    res.status(200).json({ msg: `Welcome ${user.username}`, accessToken });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
