import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authorization = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(403).json("Not Authorized, no token was provided");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.user;
    next(); // continue to the next middleware method
  } catch (err) {
    res.status(403).json("Token is not valid");
  }
}

export default authorization;