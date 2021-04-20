<template>
  <div class="card mx-auto" style="max-width: 25rem">
    <div class="card-body">
      <h5 class="card-title">Login required</h5>
      <p class="card-text">You need to login in order to proceed.</p>
      <div class="d-grid">
      <button type="button" class="btn btn-primary" @click="signIn">
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }" />
        Login with Google
      </button>
      </div>
    </div>
  </div>
</template>

<script>
import oauth from "../auth/oauth";

export default {
  methods: {
    signIn() {
      oauth.signIn();
    },
  },
};
</script>
