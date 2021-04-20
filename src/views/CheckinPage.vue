<template>
  <div>
    <template v-if="doc">
      <SearchForm :isBusy="isBusy" v-model="searchString" ref="searchForm" />
      <ResultCard
        v-for="(row, idx) in searchResults"
        :key="idx"
        :row="row"
        :isBusy="isBusy"
        @checkIn="checkIn"
      />
      <AlertMessage
        v-if="searched && searchResults.length == 0"
        message="No results found."
        type="warning"
      />
      <p v-else-if="searched">{{ searchResults.length }} results found.</p>
      <p v-if="!searched">{{ rowCount }} entries available.</p>
    </template>
    <AlertMessage v-else-if="error" :message="error" type="danger" />
    <LoadingSpinner v-else />
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";
import SearchForm from "../components/SearchForm";
import ResultCard from "../components/ResultCard";

import spreadsheet from "../api/spreadsheet";
import util from "../util/util";

export default {
  components: {
    LoadingSpinner,
    AlertMessage,
    SearchForm,
    ResultCard,
  },
  data() {
    return {
      doc: null,
      error: null,
      isBusy: false,
      searchString: "",
      searchResults: [],
      searched: false,
    };
  },
  computed: {
    rowCount() {
      return spreadsheet.getRowCountFromFirstSheet(this.doc) - 1;
    },
  },
  watch: {
    searchString(value) {
      this.resetSearch();
      if (value != "") {
        this.searchRecord(value);
      }
    },
  },
  async mounted() {
    this.$store.commit('setExternalUrl', spreadsheet.spreadsheetUrl());
    try {
      this.doc = await spreadsheet.fetchSpreadsheetDocumentWithOAuth();
      this.$store.commit('setTitle', this.doc.title);
    } catch (ex) {
      console.error(ex);
      this.error = ex;
    }
  },
  methods: {
    resetSearch() {
      this.searchResults = [];
      this.searched = false;
    },
    async searchRecord(value) {
      this.isBusy = true;
      const searchResults = [];
      const rows = await spreadsheet.getRowsFromFirstSheet(this.doc);
      for (const row of rows) {
        if (this.isMatchingRecord(row, value)) {
          searchResults.push(row);
        }
      }
      searchResults.sort((a, b) => a.Name.localeCompare(b.Name));
      this.searchResults = searchResults;
      this.searched = true;
      this.isBusy = false;
      this.$nextTick(() => {
        this.$refs.searchForm.focus();
      });
    },
    isMatchingRecord(row, value) {
      return (
        util.matchString(row.Name, value) ||
        util.fuzzyMatchIdNumberString(row.ID, value)
      );
    },
    async checkIn(row) {
      if (!confirm(`Really check-in '${row.Name}'?`)) {
        return;
      }
      this.isBusy = true;
      row.Checkin = new Date();
      try {
        await row.save();
      } catch (ex) {
        console.error(ex);
        alert(ex);
      }
      this.isBusy = false;
    },
  },
};
</script>
