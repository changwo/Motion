import { START_SEARCH } from "../types";

import axios from "axios";

// for loop 1 - 30 (unique randoms)

let resultsArray = [];
const max = 30;

export const getRandomProfiles = (token) => async (dispatch, getState) => {
  const CONFIG = {
    headers: { Authorization: `Bearer ${token}` },
  };
  for (let i = 0; i < max; i++) {
    const userID = Math.floor(Math.random() * Math.floor(734));
    const url = `https://motion.propulsion-home.ch/backend/api/users/${userID}/`;
    try {
      const response = await axios.get(url, CONFIG);
      resultsArray.push(response.data);
      console.log("getRandomProfiles -> response.data", response.data);
    } catch (e) {
      console.log("getRandomProfiles -> e", e);
    }
  }
  dispatch(getProfiles(resultsArray));
  resultsArray = [];
};

const getProfiles = (profiles) => {
  return {
    type: START_SEARCH,
    profiles,
  };
};
