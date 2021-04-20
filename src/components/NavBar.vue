<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{
        $store.state.title
      }}</router-link>
      <ul class="navbar-nav ms-auto">
        <li v-if="$store.state.externalUrl" class="nav-item">
          <a :href="$store.state.externalUrl" target="_blank" class="nav-link"
            ><font-awesome-icon icon="file-excel"
          /></a>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link :to="{ name: 'logout' }" class="nav-link">
            <font-awesome-icon icon="sign-out-alt" />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
