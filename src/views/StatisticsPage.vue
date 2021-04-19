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
      <table v-if="checkInsByDate.length > 0" class="table bg-white shadow-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th class="text-end">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in checkInsByDate" :key="entry.date">
            <td>{{ entry.date }}</td>
            <td class="text-end">{{ entry.quantity }}</td>
          </tr>
        </tbody>
      </table>
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
      checkInsByDate: [],
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
      setInterval(this.calculateStatistics, 30 * 1000);
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
      const dateMap = {};
      for (const row of rows) {
        if (
          row.Checkin &&
          row.Checkin?.trim() != "" &&
          row.Checkin != "Checkin"
        ) {
          this.checkIns++;
          const date = new Date(row.Checkin);
          if (date instanceof Date && !isNaN(date)) {
            const dateString = util.toDateString(date);
            if (dateMap[dateString]) {
              dateMap[dateString]++;
            } else {
              dateMap[dateString] = 1;
            }
            if (util.isToday(date)) {
              this.checkInsToday++;
            }
          } else {
            console.warn(`Not a date: ${row.Checkin}`);
          }
        }
      }
      this.checkInsByDate = Object.keys(dateMap)
        .sort((a, b) => b.localeCompare(a))
        .map((key) => ({
          date: key,
          quantity: dateMap[key],
        }));
    },
  },
};
</script>
