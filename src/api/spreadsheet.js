import { GoogleSpreadsheet } from "google-spreadsheet";
import oauth from "../auth/oauth";
import serviceAuth from "../auth/serviceAuth";

export default {
  async fetchSpreadsheetDocumentWithOAuth() {
    const doc = new GoogleSpreadsheet(process.env.VUE_APP_SPREADSHEET_ID);
    doc.useOAuth2Client(oauth.getClient());
    await doc.loadInfo();
    return doc;
  },
  async fetchSpreadsheetDocumentWithServiceAccount() {
    const doc = new GoogleSpreadsheet(process.env.VUE_APP_SPREADSHEET_ID);
    await doc.useServiceAccountAuth(serviceAuth.getCredentials());
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
