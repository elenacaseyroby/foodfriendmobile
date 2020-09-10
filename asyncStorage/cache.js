import asyncStorage from './index';
import {getRequest} from '../services/apiUtils';

export async function buildOrRetrieveDailyProgressCache(userId) {
  const endpoint = `/users/${userId}/progressreport/daily`;
  const progress = await buildOrRetrieveCache(endpoint, 'DAILY_PROGRESS');
  return progress;
}

export async function buildOrRetrieveDietsCache() {
  const endpoint = '/diets';
  const diets = await buildOrRetrieveCache(endpoint, 'DIETS');
  return diets;
}

export async function buildOrRetrieveNutrientsCache() {
  const endpoint = '/nutrients';
  const nutrients = await buildOrRetrieveCache(endpoint, 'NUTRIENTS');
  return nutrients;
}

export async function buildOrRetrievePrivacyPolicyCache() {
  const endpoint = '/privacypolicy';
  const privacyPolicy = await buildOrRetrieveCache(endpoint, 'PRIVACY_POLICY');
  return privacyPolicy;
}

export async function buildOrRetrieveUserRecommendedFoodsCache(userId) {
  const endpoint = `/users/${userId}/foods/?dateRange=currentDay`;
  const recFoods = await buildOrRetrieveCache(endpoint, 'RECOMMENDED_FOODS');
  return recFoods;
}

export async function buildOrRetrieveTermsCache() {
  const endpoint = '/termsandconditions';
  const terms = await buildOrRetrieveCache(endpoint, 'TERMS_AND_CONDITIONS');
  return terms;
}

export async function buildOrRetrieveUserCache(userId) {
  const endpoint = `/users/${userId}`;
  const user = await buildOrRetrieveCache(endpoint, 'USER');
  return user;
}

export async function buildOrRetrieveUserFoodsCache(userId) {
  const endpoint = `/users/${userId}/userfoods/?dateRange=currentDay`;
  const userFoods = await buildOrRetrieveCache(endpoint, 'USER_FOODS');
  return userFoods;
}

async function buildOrRetrieveCache(endpoint, KEY) {
  // return object(s) or undefined.
  let cachedObject;
  try {
    const res = await getRequest(endpoint);
    if (res.status === 200) {
      //if succeeds, get object(s) from db and update cache.
      console.log(`get ${KEY} from db`);
      asyncStorage._storeData(KEY, JSON.stringify(res.response));
      cachedObject = res.response;
    }
  } catch (error) {}
  // if fails, get object(s) from cache.
  if (!cachedObject) {
    console.log(`get ${KEY} from cache`);
    const cachedObjectStr = await asyncStorage._retrieveData(KEY);
    if (!cachedObjectStr) return;
    cachedObject = JSON.parse(cachedObjectStr);
  }
  return cachedObject;
}
