import { ThemeModes } from "models/Theme";

export const computeMuiTheme = (mode: ThemeModes): object => ({
  palette: {
    type: mode,

    primary: {
      light:        "#ffb99a",
      main:         "#ff6464",
      dark:         "#db3056",
      contrastText: "#ffffff",
    },
  },

  overrides: {
    MuiTextField: {
      root: {
        marginTop:    4,
        marginBottom: 4,
      },
    },
  },
});
