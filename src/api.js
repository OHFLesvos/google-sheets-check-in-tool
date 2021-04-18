import { GoogleSpreadsheet } from "google-spreadsheet";

export default {
  async fetchSpreadsheetDocument() {
    const doc = new GoogleSpreadsheet(process.env.VUE_APP_SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.VUE_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    });
    await doc.loadInfo();
    return doc;
  },
  getRowCountFromFirstSheet(doc) {
    const sheet = doc.sheetsByIndex[0];
    return sheet.rowCount;
  },
  async getRowsFromFirstSheet(doc) {
    const sheet = doc.sheetsByIndex[0];
    return await sheet.getRows();
  },
  spreadsheetUrl(doc = null) {
    return `https://docs.google.com/spreadsheets/d/${
      doc ? doc.spreadsheetId : process.env.VUE_APP_SPREADSHEET_ID
    }`;
  },
};
