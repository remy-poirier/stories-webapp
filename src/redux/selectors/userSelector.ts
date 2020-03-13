import { RootState } from "redux/reducer/mainReducer";
import { createSelector } from 'reselect';

const extractUser = (state: RootState) => state.user.user;
const userSelector = createSelector(
  extractUser,
  (user) => user,
);

export const getUser = (state: RootState) => userSelector(state);
