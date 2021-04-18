import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client({
  clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.VUE_APP_GOOGLE_REDIRECT_URL,
});

oAuth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    console.log(`Refresh token: ${tokens.refresh_token}`);
  }
  if (tokens.expiry_date) {
    console.log(`Expiry date: ${new Date(tokens.expiry_date)}`);
  }
  console.log(`Access token: ${tokens.access_token}`);
});

export default oAuth2Client;
