const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    msg: "success ",
    method: req.method,
    route: "home",
  });
});

app.post("/api/users", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
