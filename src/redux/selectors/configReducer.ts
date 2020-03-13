import { RootState } from "redux/reducer/mainReducer";
import { createSelector } from 'reselect';

const extractTheme = (state: RootState) => state.config.theme;
const themeSelector = createSelector(
  extractTheme,
  (theme) => theme,
);

export const getTheme = (state: RootState) => themeSelector(state);

const extractLang = (state: RootState) => state.config.lang;
const langSelector = createSelector(
  extractLang,
  (lang) => lang,
);

export const getLang = (state: RootState) => langSelector(state);
