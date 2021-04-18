<template>
  <div class="d-grid">
    <button type="button" class="btn btn-primary" @click="signIn">
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }" /> Login
    </button>
  </div>
</template>

<script>
import oauth from "../oauth";

export default {
  methods: {
    signIn() {
      oauth.signIn();
    }
  }
};
</script>
