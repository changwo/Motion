import { combineReducers } from "redux";

import { postReducer } from "./postReducer";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { profileReducer } from "./profileReducer";
import { registrationReducer } from "./registrationReducer";
import { searchReducer } from "./searchReducer";
import { userProfileReducer } from "./userProfileReducer";
import { userPostsReducer } from "./userPostsReducer";
import { errorReducer } from "./errorReducer";

export const rootReducer = combineReducers({
  authReducer,
  userReducer,
  userProfileReducer,
  postReducer,
  searchReducer,
  profileReducer,
  userPostsReducer,
  registrationReducer,
  errorReducer,
});
