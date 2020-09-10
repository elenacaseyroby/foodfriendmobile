export function filterObjectArray(array, keyword, property) {
  // Filter list for objects whose given property contains the keyword.
  // Output: filteredArray
  return array.filter((obj) =>
    obj[property].toLowerCase().includes(keyword.trim().toLowerCase()),
  );
}
