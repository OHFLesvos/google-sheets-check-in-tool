<template>
  <div>
    <div class="row row-cols-1 row-cols-sm-2 g-3 mb-3">
      <div class="col">
        <LinkCard
          label="Check-in"
          description="Search for names or ID numbers and check them in."
          :to="{ name: 'checkin' }"
          icon="user-check"
        />
      </div>
      <div class="col">
        <LinkCard
          label="Edit original document"
          description="Edit the original data source directly."
          :href="dataSourceUrl"
          :icon="{ prefix: 'fab', iconName: 'google-drive' }"
        />
      </div>
    </div>

    <h2 class="display-6">Statistics</h2>
    <template v-if="doc">
      <StatisticsWidget :doc="doc" />
    </template>
    <AlertMessage v-else-if="error" :message="error" type="danger" />
    <div v-else class="card bg-white shadow-sm">
      <div class="card-body">
        <p class="card-text">...</p>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsWidget from "../components/StatisticsWidget";
import AlertMessage from "../components/AlertMessage";
import LinkCard from "../components/LinkCard";

import spreadsheet from "../spreadsheet";

export default {
  components: {
    StatisticsWidget,
    AlertMessage,
    LinkCard,
  },
  data() {
    return {
      doc: null,
      error: null,
    };
  },
  computed: {
    dataSourceUrl() {
      return spreadsheet.spreadsheetUrl();
    },
  },
  async mounted() {
    try {
      this.doc = await spreadsheet.fetchSpreadsheetDocumentWithServiceAccount();
    } catch (ex) {
      console.error(ex);
      this.error = ex;
    }
  },
};
</script>
