import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());
const PORT = 5000;

let db = [
  {
    user: "aditya",
    pass: "12345678",
    token: "2349343kkaduakdae",
  },
];

//[TODO: GET]
app.get("/", (req, res) => {
  res.send({
    msg: "hello home ",
  });
});

app.get("/api/view", (req, res) => {
  res.send(db);
});

//[TODO: POST]

app.post(
  "/api/signup",
  body("user").isEmpty().isLength({ max: 3, min: 10 }),
  body("pass").isEmpty().isLength({ max: 8, min: 20 }),
  (req, res) => {
    const result = validationResult(req);
    const { user, pass } = req.body;

    if (result.isEmpty()) {
      return res.send({
        msg: "first conditional block ",
        error: result.array(),
      });
    } else {
      res.send({
        msg: "user created ",
        name: user,
        password: pass,
      });

      db.push({
        user: user,
        pass: pass,
      });
    }
  },
);

app.post(
  "/api/login",
  body("user").isEmpty(),

  body("pass").isEmpty(),
  (req, res) => {
    const result = validationResult(req);
    const { user, pass } = req.body;

    if (result.isEmpty()) {
      return res.send({
        error: result.array(),
      });
    } else {
      const findUser = db.find((u) => user == u.user && pass == u.pass);
      if (findUser) {
        return res.send({
          msg: "user  fetched  ",
          name: user,
          password: pass,
          token: "aidfjieijadkjfdaj433434",
        });
      } else {
        res.json({
          msg: "user does not exist",
        });
      }
    }
  },
);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
