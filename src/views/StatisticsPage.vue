<template>
  <div>
    <template v-if="doc">
      <h2>{{ doc.title }}</h2>
      <p>
        <strong>{{ rowCount }}</strong> persons registered.
      </p>
      <p v-if="checkIns >= 0">
        <strong>{{ checkIns }}</strong> persons checked in overall.
      </p>
      <p v-else><em>Caluclating...</em></p>
      <p v-if="checkInsToday >= 0">
        <strong>{{ checkInsToday }}</strong> persons checked in today.
      </p>
      <p v-else><em>Caluclating...</em></p>
    </template>
    <AlertMessage v-else-if="error" :message="error" type="danger" />
    <LoadingSpinner v-else />
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

import spreadsheet from "../spreadsheet";
import util from "../util";

export default {
  components: {
    LoadingSpinner,
    AlertMessage,
  },
  data() {
    return {
      doc: null,
      error: null,
      checkIns: -1,
      checkInsToday: -1,
    };
  },
  computed: {
    rowCount() {
      return spreadsheet.getRowCountFromFirstSheet(this.doc) - 1;
    },
  },
  async mounted() {
    this.$store.commit("setExternalUrl", spreadsheet.spreadsheetUrl());
    this.$store.commit("setTitle", "Statistics");
    try {
      this.doc = await spreadsheet.fetchSpreadsheetDocumentWithServiceAccount();
      await this.calculateStatistics();
      setInterval(this.calculateStatistics, 10 * 1000);
    } catch (ex) {
      console.error(ex);
      this.error = ex;
    }
  },
  methods: {
    async calculateStatistics() {
      const rows = await spreadsheet.getRowsFromFirstSheet(this.doc);
      this.checkIns = 0;
      this.checkInsToday = 0;
      for (const row of rows) {
        if (
          row.Checkin &&
          row.Checkin?.trim() != "" &&
          row.Checkin != "Checkin"
        ) {
          this.checkIns++;
          const date = new Date(row.Checkin);
          if (date instanceof Date && !isNaN(date)) {
            if (util.isToday(date)) {
              this.checkInsToday++;
            }
          } else {
            console.debug(`Not a date: ${row.Checkin}`)
          }
        }
      }
    },
  },
};
</script>
