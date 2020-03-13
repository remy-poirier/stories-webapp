import { ThemeModes } from "models/Theme";
import { Locales } from "models/Locale";

interface State {
  theme: ThemeModes;
  lang: Locales;
}

const initialState: State = {
  theme: ThemeModes.DARK,
  lang:  Locales.French,
};

export default function (state = initialState, action: any): State {
  switch (action.type) {
    default:
      return state;
  }
}
