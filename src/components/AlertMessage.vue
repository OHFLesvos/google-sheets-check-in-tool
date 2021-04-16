<template>
  <div :class="`alert alert-${type}`" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
    },
    type: {
      required: true,
    }
  },
};
</script>
