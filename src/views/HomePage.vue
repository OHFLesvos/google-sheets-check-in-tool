<template>
  <div class="list-group">
    <router-link
      :to="{ name: 'checkin' }"
      class="list-group-item list-group-item-action"
      >Check-in</router-link
    >
    <router-link
      :to="{ name: 'login' }"
      class="list-group-item list-group-item-action"
    >
      Login</router-link
    >
  </div>
</template>
