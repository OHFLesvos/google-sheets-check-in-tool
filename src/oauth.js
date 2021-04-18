import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client(
  process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
  process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.VUE_APP_GOOGLE_REDIRECT_URL
);

export default oAuth2Client;
// const oauthClient = new OAuth2Client({
//     clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
//   });