<template>
  <div v-if="token">
    Logged in
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

export default {
  data() {
    return {
      token: null,
    };
  },
  async mounted() {
    const code = this.$route.query.code;
    if (code) {
      const oAuth2Client = new OAuth2Client(
        process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
        process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
        process.env.VUE_APP_GOOGLE_REDIRECT_URL
      );
      this.token = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(this.token.tokens);

      const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
      );
      console.log(tokenInfo);
    }
  },
  methods: {
    async signIn() {
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/userinfo.profile",
        hd: "ohf-lesvos.org",
      });
      window.location.href = authorizeUrl;
    },
  },
};
</script>
