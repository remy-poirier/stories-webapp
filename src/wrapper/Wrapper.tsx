import React, { useEffect, useState } from 'react';
import { Routes } from "redux/actions/GlobalActions";
import globalConnect from "redux/actions/utils";
import { auth } from "conf/firebase/firebase";
import { appTheme } from "conf/theme/style";
import { RootState } from "redux/reducer/mainReducer";
import { getLang, getTheme } from "redux/selectors/configReducer";
import { ThemeModes } from "models/Theme";
import { IntlProvider } from 'react-intl';
import { Locales } from "models/Locale";

import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { ProgressIndicator } from "shared";
import Header from "wrapper/header/Header";
import { getUser } from "redux/selectors/userSelector";
import Snackbar from "wrapper/snackbar/Snackbar";

const useStyles = makeStyles((theme: Theme) => ({

  container: {
    padding: theme.spacing(2),
    margin:  "0 auto 0",

    [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
      maxWidth: theme.breakpoints.values.lg,
    },

    "& a": {
      textDecoration: "none",
      color:          "inherit",
    },
  },

  appbar: {
    display:    "flex",
    alignItems: "flex-end",

    "& a": {
      textDecoration: "none",
      color:          "inherit",
    },
  },

  loadingProgress: {
    display:       "flex",
    flexDirection: "column",
    alignItems:    "center",
    marginTop:     theme.spacing(2),
  },

  linearProgress: {
    width:     300,
    marginTop: theme.spacing(1),
  },
}));

interface Props {
  actions: Routes;
  theme: ThemeModes;
  lang: Locales;
  children: any;
}

const Wrapper = (props: Props) => {
  const { actions, theme, lang, children } = props;

  const classes = useStyles();

  const [fetchUser, setFetchUser] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // @ts-ignore
        actions.user.fetchUser(user.email).then(() => setFetchUser(false))
          .catch(() => setFetchUser(false));
      } else {
        setFetchUser(false);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <IntlProvider locale={lang}>
        <CssBaseline />

        {fetchUser && (
          <ProgressIndicator />
        )}

        {!fetchUser && (
          <>
            <Header />
            <div className={classes.container}>
              {children}
            </div>
          </>
        )}

        <Snackbar />

      </IntlProvider>
    </ThemeProvider>
  );
};

const stateToProps = (state: RootState) => ({
  theme: getTheme(state),
  lang:  getLang(state),
  user:  getUser(state),
});

export default globalConnect(stateToProps)(Wrapper);
