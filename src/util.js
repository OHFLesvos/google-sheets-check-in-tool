function cleanNumberString(value) {
  if (value) {
    return value.replace(/[^0-9a-z]/gi, "");
  }
  return value;
}

function matchString(haystack, needle) {
  if (haystack && needle) {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
  }
  return false;
}

function fuzzyMatchIdNumberString(haystack, needle) {
  return matchString(cleanNumberString(haystack), cleanNumberString(needle));
}

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

export default {
  matchString,
  fuzzyMatchIdNumberString,
  isToday
};
