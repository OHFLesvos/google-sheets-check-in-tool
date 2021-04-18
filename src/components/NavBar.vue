<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">{{ title }}</a>
      <ul class="navbar-nav ms-auto">
        <li v-if="externalUrl" class="nav-item">
          <a :href="externalUrl" target="_blank" class="nav-link"
            ><font-awesome-icon icon="file-excel"
          /></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
    },
    externalUrl: {
      required: false,
    },
  },
};
</script>
