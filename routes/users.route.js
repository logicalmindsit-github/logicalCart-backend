import express from "express";
import Users from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();
const secret = process.env.SECRET;
router.use(express.json());

router.get("/admin", adminMiddleware, async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/delete/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete({ _id: id });
    res.send("User deleted successfully");
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/signin/admin", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await Users.findOne({ email: email });
    if (exist) {
      return res.send(
        "user with this email already exist please choose different email"
        // exist
      );
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          const user = await Users.create({
            username: username,
            email: email,
            password: hash,
            role: "Admin",
          });
          res.status(200).send("Sign up success");
        }
      });
    }
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await Users.findOne({ email: email });
    if (exist) {
      return res.send(
        "user with this email already exist please choose different email"
        // exist
      );
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          const user = await Users.create({
            username: username,
            email: email,
            password: hash,
          });
          res.status(200).send("Sign up success");
        }
      });
    }
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { id: user._id, name: user.username, role: user.role },
            secret
          );
          res.send({
            msg: "Login success",
            token: token,
            name: user.username,
            role: user.role,
          });
        } else {
          res.status(401).send("incorrect password");
        }
      });
    } else {
      res.status(401).send("User not found");
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default router;
