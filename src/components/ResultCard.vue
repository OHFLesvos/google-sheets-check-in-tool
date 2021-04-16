<template>
  <div class="card mb-3 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ row.Name }}</h5>
      <p class="card-text">
        <font-awesome-icon icon="id-card" />
        {{ row.ID }}
      </p>
      <p v-if="isCheckedIn(row)" class="card-text">
        Checked in at {{ row.Checkin | dateFormat }}
      </p>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click="$emit('checkIn', row)"
        :disabled="isBusy"
      >
        <font-awesome-icon icon="check" />
        Check-in
      </button>
    </div>
  </div>
</template>

<script>
import dateFormatFilterMixin from "../dateFormatFilterMixin";

export default {
  props: {
    row: {
      required: true,
    },
    isBusy: Boolean
  },
  mixins: [dateFormatFilterMixin],
  methods: {
    isCheckedIn(row) {
      return row.Checkin && row.Checkin != "";
    },
  },
};
</script>
