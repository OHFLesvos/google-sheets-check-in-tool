import { GoogleSpreadsheet } from "google-spreadsheet";
import { OAuth2Client } from "google-auth-library";
import store from "./store";

export default {
  async fetchSpreadsheetDocument() {
    const doc = new GoogleSpreadsheet(process.env.VUE_APP_SPREADSHEET_ID);

    const oauthClient = new OAuth2Client({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
    });
    oauthClient.credentials.access_token = store.state.access_token;
    oauthClient.credentials.refresh_token = store.state.refresh_token;
    oauthClient.credentials.expiry_date = store.state.expiry_date

    doc.useOAuth2Client(oauthClient);

    // await doc.useServiceAccountAuth({
    //   client_email: process.env.VUE_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    // });
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
