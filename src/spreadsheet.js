import { GoogleSpreadsheet } from "google-spreadsheet";
import oauth from "./oauth";

export default {
  async fetchSpreadsheetDocument() {
    const doc = new GoogleSpreadsheet(process.env.VUE_APP_SPREADSHEET_ID);
    doc.useOAuth2Client(oauth.getClient());
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
