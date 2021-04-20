import { GoogleSpreadsheet } from "google-spreadsheet";
import oauth from "../auth/oauth";
import serviceAuth from "../auth/serviceAuth";

const spreadsheetId = process.env.VUE_APP_SPREADSHEET_ID;

export default {
  async fetchSpreadsheetDocumentWithOAuth() {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    doc.useOAuth2Client(oauth.getClient());
    await doc.loadInfo();
    return doc;
  },
  async fetchSpreadsheetDocumentWithServiceAccount() {
    const doc = new GoogleSpreadsheet(spreadsheetId);
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
  spreadsheetUrl() {
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  },
};
