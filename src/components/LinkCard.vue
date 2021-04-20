<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-4 align-items-center">
        <div class="col-auto">
          <font-awesome-icon :icon="icon" size="3x" />
        </div>
        <div class="col">
          <h5 class="card-title">
            <a
              v-if="href"
              :href="href"
              target="_blank"
              class="stretched-link text-decoration-none"
              >{{ label }}</a
            >
            <router-link
              v-else
              :to="to"
              class="stretched-link text-decoration-none"
              >{{ label }}</router-link
            >
          </h5>
          <p class="card-text">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { required: true },
    description: { required: true },
    icon: { required: true },
    to: { required: false },
    href: { required: false },
  },
};
</script>
