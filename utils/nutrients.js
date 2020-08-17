export function orderNutrientsByTheme(nutrients) {
  // sort nutrients into dict by theme id
  let nutrientByTheme = {};
  nutrients.map((nutrient) => {
    if (!nutrientByTheme[nutrient.themeId]) {
      nutrientByTheme[nutrient.themeId] = [];
    }
    nutrientByTheme[nutrient.themeId].push(nutrient);
  });
  // if theme is added in nutrient button, must update here as well:
  const themeIds = [1, 2, 3, 4, 5];
  let orderedNutrients = [];
  themeIds.map((i) => {
    if (nutrientByTheme[i]) {
      orderedNutrients = orderedNutrients.concat(nutrientByTheme[i]);
    }
  });
  return orderedNutrients;
}
