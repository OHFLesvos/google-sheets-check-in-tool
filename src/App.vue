<template>
  <div id="app">
    <NavBar :title="title" :externalUrl="spreadsheetUrl" />
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
  data() {
    return {
      title: 'test',
      spreadsheetUrl: 'tst'
    }
  }
};
</script>
