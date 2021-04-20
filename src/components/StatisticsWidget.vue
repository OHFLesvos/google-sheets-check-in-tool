<template>
  <div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-3">
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="display-4">
              {{ checkInsToday >= 0 ? checkInsToday : "..." }}
            </h2>
            <p class="card-text">Persons checked in today</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="display-4">
              {{ checkIns >= 0 ? checkIns : "..." }}
            </h2>
            <p class="card-text">Persons checked in overall</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="display-4">{{ rowCount }}</h2>
            <p class="card-text">Persons registered</p>
          </div>
        </div>
      </div>
    </div>

    <table v-if="checkInsByDate.length > 0" class="table bg-white shadow-sm">
      <caption>
        <strong>Data source: </strong>
        <a :href="dataSourceUrl" target="_blank">{{ doc.title }}</a>
      </caption>
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
  </div>
</template>

<script>
import spreadsheet from "../api/spreadsheet";
import util from "../util/util";

export default {
  props: {
    doc: {
      required: true,
    },
  },
  data() {
    return {
      checkIns: -1,
      checkInsToday: -1,
      checkInsByDate: [],
    };
  },
  computed: {
    rowCount() {
      return spreadsheet.getRowCountFromFirstSheet(this.doc) - 1;
    },
    dataSourceUrl() {
      return spreadsheet.spreadsheetUrl();
    },
  },
  async mounted() {
    await this.calculateStatistics();
    setInterval(this.calculateStatistics, 30 * 1000);
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
