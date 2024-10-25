const express = "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send({
    msg: "success ",
    method: req.method,
    route: "home",
  });
});
app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
