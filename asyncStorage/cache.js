import asyncStorage from './index';
import {getRequest} from '../services/apiUtils';

export async function buildOrRetrieveDietCache() {}

export async function buildOrRetrieveNutrientCache() {}

export async function buildOrRetrievePathCache() {}

export async function buildOrRetrievePrivacyPolicyCache() {}

export async function buildOrRetrieveTermsCache() {}

export async function buildOrRetrieveUserCache(userId) {
  let user;
  try {
    const endpoint = `/users/${userId}`;
    const res = await getRequest(endpoint);
    if (res.status === 200) {
      //if succeeds, get user from db and update cache.
      console.log('get user from db');
      asyncStorage._storeData('USER', JSON.stringify(res.response));
      user = res.response;
    }
  } catch (error) {}
  // if fails, get user from cache.
  if (!user) {
    console.log('get user from cache');
    const userStr = await asyncStorage._retrieveData('USER');
    user = JSON.parse(userStr);
    console.log(JSON.stringify(user));
  }
  // return user or undefined.
  return user;
}
