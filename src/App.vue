<template>
  <div id="app">
    <NavBar />
    <main class="container my-3">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
