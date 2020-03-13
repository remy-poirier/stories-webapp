import { combineReducers } from "redux";
import storiesReducer from "redux/reducer/storiesReducer";
import { StateType } from "typesafe-actions";
import configReducer from "redux/reducer/configReducer";
import userReducer from "redux/reducer/userReducer";
import conversationReducer from "redux/reducer/conversationReducer";
import snackbarReducer from "redux/reducer/snackbarReducer";

const mainReducer = combineReducers({
  config:       configReducer,
  stories:      storiesReducer,
  user:         userReducer,
  conversation: conversationReducer,
  snackbar:     snackbarReducer,
});

export type RootState = StateType<typeof mainReducer>;

export const rootReducer = (state: any, action: any): RootState => mainReducer(state, action);

