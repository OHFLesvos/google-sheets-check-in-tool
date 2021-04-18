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
import oAuth2Client from "../oauth";

export default {
  methods: {
    async signIn() {
      // See https://developers.google.com/identity/protocols/oauth2/scopes#sheets
      const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/spreadsheets"
      ];

      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes.join(" "),
        hd: "ohf-lesvos.org"
        // prompt: "consent",
      });
      window.location.href = authorizeUrl;
    },
    async signOut() {
      this.$store.commit("clearAuthenticated");
    }
  }
};
</script>
