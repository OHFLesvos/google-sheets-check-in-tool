export default {
  filters: {
    dateFormat: function(value) {
      if (!value) return "";
      const date = new Date(value);
      if (date instanceof Date && !isNaN(date)) {
        return date.toLocaleString("en-GB");
      }
      return value;
    },
  },
};
