import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;

const adminMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  console.log("token=>", token);
  console.log("token ?", !!token);

  try {
    if (token) {
      const newToken = token.split(" ")[1];
      const decode = jwt.verify(newToken, secret);
      console.log(newToken)
      
      if (decode.role === "Admin") {
        req.body.userId = decode.id;
        next();
      } else {
        res.status(403).send("You are not Authorized to perform this function");
      }
    } else {
      res.status(401).send("Invalid token");
    }
  } catch (e) {
    res.status(401).send("No token found, please login");
  }
};

export default adminMiddleware;
