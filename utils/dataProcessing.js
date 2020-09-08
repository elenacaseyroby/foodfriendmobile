export function filterObjectArray(array, keyword, property) {
  // Filter list for objects whose given property contains the keyword.
  // Output: filteredArray
  return array.filter((obj) =>
    obj[property].toLowerCase().includes(keyword.trim().toLowerCase()),
  );
}

export function combineObjectArrays(arrays, distinctProperty = 'id') {
  // Combine array of object arrays (an array of objects)
  // into one array of distinct objects.
  // Output: distinctObjects

  let distinctValues = [];
  let distinctObjects = [];
  // Iterate through each array of objects
  arrays.map((array) => {
    array.map((obj) => {
      // If this is the first time the object has appeared
      // add it to the distinct objects array.
      if (!distinctValues.includes(obj[distinctProperty])) {
        distinctValues.push(obj[distinctProperty]);
        distinctObjects.push(obj);
      }
    });
  });
  return distinctObjects;
}

export function intersectionOfObjectArrays(arrays, distinctProperty = 'id') {
  // Find objects in all arrays.
  // Output: distinctObjects

  // Create hash by distinct property value for each object.
  let hash = {};
  arrays.map(function (array, index) {
    array.map((obj) => {
      // if distinct property value (key) doesn't exist for object, create it.
      if (!hash[obj[distinctProperty]]) {
        hash[obj[distinctProperty]] = [];
      }
      // Add array index if object appears in array and the index hasn't already been added.
      if (!hash[obj[distinctProperty]].includes(index)) {
        hash[obj[distinctProperty]].push(index);
      }
    });
  });
  const arrayCount = arrays.length;
  let distinctPropertyValues = [];
  let objectsInAllArrays = [];
  // Iterate through all objects again and add to distinctObjects i
  arrays.map((array) => {
    array.map((obj) => {
      // if obj not in distictObjects and exists in all 3 arrays, add to distinctObjects.
      const propertyValue = obj[distinctProperty];
      if (
        !distinctPropertyValues.includes(propertyValue) &&
        hash[propertyValue].length === arrayCount
      ) {
        // add distinct property value to array to track added objects and avoid duplicates.
        distinctPropertyValues.push(propertyValue);
        // add objects to array to be returned.
        objectsInAllArrays.push(obj);
      }
    });
  });
  return objectsInAllArrays;
}
