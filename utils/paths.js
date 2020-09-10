import {
  combineObjectArrays,
  intersectionOfObjectArrays,
} from './dataProcessing';

export function getHighValueFoodsInPath(allNutrients, path) {
  // Get foods that are in every nutrient in path.
  const pathNutrientIds = path.nutrients.map((nutrient) => {
    return nutrient.id;
  });
  let foodArrays = [];
  allNutrients.map((nutrient) => {
    // if nutrient in path add its foods to the list.
    console.log(nutrient.foods);
    if (pathNutrientIds.includes(nutrient.id)) {
      foodArrays.push(nutrient.foods);
    }
  });
  const highValueFoods = intersectionOfObjectArrays(foodArrays);
  console.log(highValueFoods);
  return highValueFoods;
}
