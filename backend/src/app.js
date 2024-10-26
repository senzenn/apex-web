import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
const port = 5000;
app.use(express.json());

const token = "addeklkKKyhy28283";
const db = [
  {
    user: "aditya",
    password: "1234",
    token: token,
  },
  {
    user: "naruto",
    password: "1234",
    token: null,
  },
  {
    user: "kin",
    password: "1234",
    token: null,
  },
];

// [TODO: GET]
app.get("/", (req, res) => {
  res.send("home page");
});

// [TODO: Post]
app.post(
  "/api/signup",
  body("user").notEmpty().withMessage("User field cannot be empty"),
  body("password").notEmpty().withMessage("Password field cannot be empty"),
  (req, res) => {
    const result = validationResult(req);
    const { user, password } = req.body;

    if (!result.isEmpty()) {
      return res.status(400).json({
        msg: "Please enter valid input",
        errors: result.array(),
      });
    }

    db.push({ user: user, password: password, token: token });
    return res.status(200).json({
      msg: "User created",
      userName: user,
      password: password,
    });
  },
);

app.post(
  "/api/login",
  body("user").notEmpty().withMessage("User field cannot be empty"), // Validate user input
  body("pass").notEmpty().withMessage("Password field cannot be empty"), // Validate password input
  (req, res) => {
    const result = validationResult(req);
    const { user, pass } = req.body;

    // Check for validation errors first
    if (!result.isEmpty()) {
      return res.status(400).json({
        msg: "Fields can't be empty",
        errors: result.array(),
      });
    }

    const findUser = db.find((us) => us.user === user && us.password === pass);
    if (findUser) {
      return res.json({
        msg: "User fetched successfully",
        user: user,
        token: token,
      });
    } else {
      return res.status(401).json({
        msg: "User does not exist",
      });
    }
  },
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
