import { OAuth2Client } from "google-auth-library";
import store from "../store";

const oAuth2Client = new OAuth2Client({
  clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.VUE_APP_GOOGLE_REDIRECT_URL
});

// See https://developers.google.com/identity/protocols/oauth2/scopes#sheets
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/spreadsheets"
];

oAuth2Client.on("tokens", tokens => {
  if (tokens.refresh_token) {
    console.log(`Refresh token: ${tokens.refresh_token}`);
  }
  if (tokens.expiry_date) {
    console.log(`Expiry date: ${new Date(tokens.expiry_date)}`);
  }
  console.log(`Access token: ${tokens.access_token}`);
});

function signIn() {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes.join(" "),
    hd: "ohf-lesvos.org"
    // prompt: "consent",
  });
  window.location.href = authorizeUrl;
}

async function handleCallback(query) {
  const code = query.code;
  if (code) {
    const res = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(res.tokens);

    store.commit("setAuthenticated", {
      access_token: oAuth2Client.credentials.access_token,
      refresh_token: oAuth2Client.credentials.refresh_token,
      expiry_date: oAuth2Client.credentials.expiry_date
    });
  }
}

function signOut() {
  store.commit("clearAuthenticated");
}

function getClient() {
  oAuth2Client.credentials.access_token = store.state.access_token;
  oAuth2Client.credentials.refresh_token = store.state.refresh_token;
  oAuth2Client.credentials.expiry_date = store.state.expiry_date
  return oAuth2Client;
}

export default {
  signIn,
  handleCallback,
  signOut,
  getClient
};
