const redirect = require("micro-redirect");
const Spreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

const creds = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: Buffer.from(process.env.PRIVATE_KEY, "base64").toString()
};

async function getSheet(n, doc) {
  // Authenticate with the Google Spreadsheets API.
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[n];
  return sheet;
}

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const ref =
      req.headers["Referer"] || req.headers["referer"] || "https://google.com";
    try {
      const { sheetId, sheetNo, ...body } = req.body;
      const doc = new Spreadsheet(sheetId);
      const sheet = await getSheet(sheetNo || 0, doc);
      await promisify(sheet.addRow)(body);

      redirect(res, 301, `${ref}?success=1`);
    } catch (err) {
      console.log(err);
      redirect(res, 301, `${ref}?success=0`);
    }
  } else {
    redirect(res, 200, "https://github.com/dotangad/formless");
  }
};
