const express = require("express");
const asyncH = require("express-async-handler");
const Spreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

// const creds = require("./client-secret.json");
const creds = JSON.parse(process.env.SECRET || "{}");
console.log(process.env.SECRET);
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

async function getSheet(n, doc) {
  // Authenticate with the Google Spreadsheets API.
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[n];
  return sheet;
}

app.post(
  "/:sheetId",
  asyncH(async (req, res) => {
    try {
      const ref = req.header("Referer") || "https://google.com";
      const { sheetId } = req.params;
      const doc = new Spreadsheet(sheetId);
      const sheet = await getSheet(0, doc);
      await promisify(sheet.addRow)(req.body);

      res.redirect(200, ref);
    } catch (err) {
      console.log(err);
      res.redirect(500, ref);
    }
  })
);

app.listen(5000, () =>
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`)
);
