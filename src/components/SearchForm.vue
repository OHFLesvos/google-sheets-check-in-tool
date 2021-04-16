<template>
  <form @submit.prevent="submit">
    <div class="row g-2 mb-3">
      <div class="col">
        <input
          type="search"
          class="form-control"
          placeholder="Search for name or ID"
          v-model.trim="searchString"
          ref="searchInput"
          autofocus
          :disabled="isBusy"
          @click="$refs.searchInput.select()"
        />
      </div>
      <div class="col col-auto">
        <button type="submit" class="btn btn-primary" :disabled="isBusy">
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isBusy: Boolean,
    value: {},
  },
  data() {
    return {
      searchString: this.value,
    };
  },
  methods: {
    submit() {
      if (this.searchString == "") {
        this.$refs.searchInput.focus();
        return;
      }
      this.$emit("input", this.searchString);
    },
    focus() {
      this.$refs.searchInput.focus();
    },
  },
};
</script>
