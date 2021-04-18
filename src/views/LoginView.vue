<template>
  <div class="d-grid">
    <button type="button" class="btn btn-primary" @click="signIn">
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }" /> Login
      with Google
    </button>
  </div>
</template>

<script>
import oauth from "../oauth";

export default {
  async mounted() {
    this.$store.commit("setTitle", "Login");
  },
  methods: {
    signIn() {
      oauth.signIn();
    }
  }
};
</script>
