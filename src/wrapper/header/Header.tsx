import React, { useState } from 'react';
import { AppBar, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import globalConnect from "redux/actions/utils";
import { RootState } from "redux/reducer/mainReducer";
import { getUser } from "redux/selectors/userSelector";
import { AppRoute } from "conf/routes";
import { Link } from "react-router-dom";
import { Btn } from "shared";
import { Routes } from "redux/actions/GlobalActions";
import { HeaderItemInterface } from "wrapper/header/Constants";
import App from "App";
import { RouteComponentProps } from "react-router";
import HeaderDesktop from "wrapper/header/HeaderDesktop";
import HeaderMobile from "wrapper/header/HeaderMobile";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  toolbarTitle: {
    fontSize: 25,
    fontWeight: theme.typography.fontWeightBold,
  },

  toolbarLinks: {
    display: "flex",
    flex: 1,
    textAlign: "right",
    justifyContent: "flex-end",

    "& > a": {
      margin: theme.spacing(0, 1),

      "&:first-of-type": {
        marginLeft: 0,
      },

      "&:last-of-type": {
        marginRight: 0,
      },
    },
  },

  logout: {
    marginLeft: theme.spacing(2),
  },

  wrapper: {
    display: "flex",
  },
}));

interface Props extends RouteComponentProps {
  user: any;
  actions: Routes;
}


const Header = (props: Props) => {
  const { user, actions, location } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const classes = useStyles();

  const onLogout = () => {
    actions.user.logout();
  };

  const generateHeaderItems = () => {
    const headerItems: HeaderItemInterface[] = [
      {
        url: AppRoute.Home,
        label: "Accueil",
      },
    ];

    if (!user) {
      headerItems.push({
        url:   AppRoute.Auth,
        label: "Connexion/Inscription",
      });
    } else {
      headerItems.push(
        {
          url:   AppRoute.Stories,
          label: "Mes histoires",
        },
        {
          label:  "Déconnexion",
          onClick: onLogout,
        },
      );
    }

    return headerItems;
  };

  return (
    <div className={classes.wrapper}>
      <HeaderDesktop
        headerItems={generateHeaderItems()}
      />
      <HeaderMobile
        headerItems={generateHeaderItems()}
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
      />
    </div>
  )
};

const stateToProps = (state: RootState) => ({
  user: getUser(state),
});

export default globalConnect(stateToProps)(Header);
