import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client({
    clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: process.env.VUE_APP_GOOGLE_REDIRECT_URL
});

export default oAuth2Client;
