const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const port = process.env.port || 3000;
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use(validate);
app.post("/validate", validate, (req, res, next) => {});

function validate(req, res, next) {
  const PAN_no = req.body;
  var regex = RegExp("^[A-Z]{3}[ABCFGHLJPT][A-Z][0-9]{4}[A-Z]$");
  console.log(PAN_no.PANnumber);
  if (regex.test(PAN_no.PANnumber)) {
    res.json({ "Success ": "PAN Validation Successful..!" });
  } else {
    res.json({ "Error: ": "Sorry, PAN Card Number Invalid..!" });
  }
}

app.listen(port, () => console.log("Server started successfully"));
