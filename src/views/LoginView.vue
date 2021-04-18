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
import oauth from "../oauth";

export default {
  methods: {
    signIn() {
      oauth.signIn();
    },
    signOut() {
      oauth.signOut();
    }
  }
};
</script>
