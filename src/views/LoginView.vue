<template>
  <div v-if="$store.state.refresh_token">
    <p>Logged in</p>
    <button type="button" class="btn btn-primary" @click="signOut">
      Logout
    </button>
  </div>
  <div v-else class="text-center">
    <button type="button" class="btn btn-primary" @click="signIn">Login</button>
  </div>
</template>

<script>
import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client(
  process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
  process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.VUE_APP_GOOGLE_REDIRECT_URL
);

oAuth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    console.log(`Refresh token: ${tokens.refresh_token}`);
  }
  if (tokens.expiry_date) {
    console.log(`Expiry date: ${tokens.expiry_date}`);
  }
  console.log(`Access token: ${tokens.access_token}`);
});

export default {
  async mounted() {
    const code = this.$route.query.code;
    if (code) {
      const res = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(res.tokens);

      this.$store.commit("setAuthenticated", {
        access_token: oAuth2Client.credentials.access_token,
        refresh_token: oAuth2Client.credentials.refresh_token,
        expiry_date: oAuth2Client.credentials.expiry_date,
      });

      const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
      );
      console.log(tokenInfo.scopes);
    }
  },
  methods: {
    async signIn() {
      const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/spreadsheets',
      ];

      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes.join(' '),
        hd: "ohf-lesvos.org",
        // prompt: "consent",
      });
      window.location.href = authorizeUrl;
    },
    async signOut() {
      this.$store.commit("clearAuthenticated");
    },
  },
};
</script>
