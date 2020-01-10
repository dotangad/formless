const express = require("express");
const asyncH = require("express-async-handler");

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

app.post(
  "/",
  asyncH(async (req, res) => {
    res.json(req.body);
  })
);

// Listen on port 5000
app.listen(port, () =>
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`)
);
