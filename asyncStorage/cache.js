import asyncStorage from './index';
import {getRequest} from '../services/apiUtils';

export async function buildOrRetrieveDailyProgressCache(userId) {
  const endpoint = `/users/${userId}/progressreport/daily`;
  const progress = await getData(endpoint, 'DAILY_PROGRESS');
  return progress;
}

export async function buildOrRetrieveDietsCache() {
  const endpoint = '/diets';
  const diets = await getData(endpoint, 'DIETS');
  return diets;
}

export async function buildOrRetrieveNutrientsCache() {
  const endpoint = '/nutrients';
  const nutrients = await getData(endpoint, 'NUTRIENTS');
  return nutrients;
}

export async function buildOrRetrievePrivacyPolicyCache() {
  const endpoint = '/privacypolicy';
  const privacyPolicy = await getData(endpoint, 'PRIVACY_POLICY');
  return privacyPolicy;
}

export async function buildOrRetrieveRecentlyConsumedFoodsCache(userId) {
  const endpoint = `/users/${userId}/foods/?limit=7`;
  const recFoods = await getData(endpoint, 'RECENTLY_CONSUMED_FOODS');
  return recFoods;
}

export async function buildOrRetrieveTermsCache() {
  const endpoint = '/termsandconditions';
  const terms = await getData(endpoint, 'TERMS_AND_CONDITIONS');
  return terms;
}

export async function buildOrRetrieveUserCache(userId) {
  const endpoint = `/users/${userId}`;
  const user = await getData(endpoint, 'USER');
  return user;
}

export async function buildOrRetrieveUserFoodsCache(userId) {
  const endpoint = `/users/${userId}/userfoods/?dateRange=currentDay`;
  const userFoods = await getData(endpoint, 'USER_FOODS');
  return userFoods;
}

export async function buildOrRetrieveUserRecipesCache(userId) {
  const endpoint = `/users/${userId}/recipes`;
  const userRecipes = await getData(endpoint, 'USER_RECIPES');
  return userRecipes;
}

export async function buildOrRetrieveActivePathRecipesCache(userId) {
  const endpoint = `/users/${userId}/activePath/recipes`;
  const activePathRecipes = await getData(endpoint, 'ACTIVEPATH_RECIPES');
  return activePathRecipes;
}

async function getData(endpoint, KEY) {
  // return data or undefined.
  let data;
  try {
    const res = await getRequest(endpoint);
    if (res.status === 200) {
      // if succeeds, get data from db
      data = res.response;
    } else {
      // log error.
      console.log(
        `Error fetching ${KEY} from db. endpoint: ${endpoint}, status: ${
          res.status
        }, message: ${res.response.message || ''}`,
      );
    }
  } catch (error) {
    console.log(
      `error fetching ${KEY} from db. endpoint: ${endpoint} error: ${error}`,
    );
  }
  return data;
}

// if we ever want to go back to caching data:
// (will take up more space on phone but will work on reload without internet)
async function buildOrRetrieveCache(endpoint, KEY) {
  // return object(s) or undefined.
  let dbObject;
  try {
    const res = await getRequest(endpoint);
    if (res.status === 200) {
      //if succeeds, get object(s) from db and update cache.
      console.log(`get ${KEY} from db`);
      asyncStorage._storeData(KEY, JSON.stringify(res.response));
      dbObject = res.response;
    } else {
      console.log(
        `error fetching ${KEY} from db. status: ${res.status}, message: ${
          res.response.message || ''
        }`,
      );
    }
  } catch (error) {
    console.log(`error fetching ${KEY} from db: ${error}`);
  }
  if (dbObject) {
    return dbObject;
  }
  // if db request fails, get object(s) from cache.
  console.log(`get ${KEY} from cache`);
  const cachedObjectStr = await asyncStorage._retrieveData(KEY);
  if (!cachedObjectStr) return;
  const cachedObject = JSON.parse(cachedObjectStr);
  return cachedObject;
}
