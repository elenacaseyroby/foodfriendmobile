export function searchFoods(foodArray, keyword) {
  // Filter list for foods whose name contains the keyword.
  // Output: filteredAFoodsArray
  return searchObjects(foodArray, keyword, 'name');
}

export function searchObjects(array, keyword, property) {
  // Filter list for objects whose given property contains the keyword.
  // Output: filteredObjects
  const filteredObjects = array.filter((obj) =>
    obj[property].toLowerCase().includes(keyword.trim().toLowerCase()),
  );
  return filteredObjects;
}
