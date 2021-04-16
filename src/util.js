function cleanNumberString(value) {
  return value.replace(/[^0-9a-z]/gi, "");
}

function matchString(haystack, needle) {
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
}

function fuzzyMatchIdNumberString(haystack, needle) {
  return matchString(cleanNumberString(haystack), cleanNumberString(needle));
}

export default {
  matchString,
  fuzzyMatchIdNumberString,
};
