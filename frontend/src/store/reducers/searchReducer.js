import { START_SEARCH , CLEAR_LIST} from "../types";

const initialState = {
  searchList: null,
};

export const searchReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case START_SEARCH: {
      return { ...newState, searchList: action.profiles };
    }
    case CLEAR_LIST: {
      return { ...newState, searchList: null };
    }
    default:
      return state;
  }
};
