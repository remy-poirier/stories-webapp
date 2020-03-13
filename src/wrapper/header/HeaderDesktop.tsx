import React from 'react';
import { HeaderItemInterface } from "wrapper/header/Constants";
import { Button, Typography } from "@material-ui/core";
import { AppRoute } from "conf/routes";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  desktopWrapper: {
    display: "flex",
    flex:    1,
    height:  60,
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    padding: theme.spacing(0, 2),

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: "none",
    },
  },

  img: {
    height: 60,
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
  },

  logoLink: {
    color: theme.palette.primary.contrastText,
  },

  headerNavContainer: {
    display:       "flex",
    flex:          1,
    justifyContent: "flex-end",
  },

  headerNavRow: {
    height: 60,
  },

  headerMainNav: {
    backgroundColor: theme.palette.common.white,
  },

  headerSubNav: {
    backgroundColor: "rgb(245, 245, 245)",
    display:         "flex",
    height:          60,
  },

  buttonContainer: {
    display:        "flex",
    justifyContent: "flex-end",
  },

  topNavButton: {
    borderRadius: 0,
    height:       60,
    fontWeight:   theme.typography.fontWeightBold,
    color:        theme.palette.common.white,
  },

  anchorLink: {
    flex:    1,
    display: "flex",
  },

  subHeaderButton: {
    flex:            1,
    boxShadow:       "none",
    backgroundColor: "transparent",
    color:           theme.palette.common.black,
    height:          60,
    fontWeight:      theme.typography.fontWeightBold,
    borderRadius:    0,
    lineHeight:      "24px",
    overflow:        "hidden",

    "&:hover": {
      backgroundColor: "#999999",
      color:           theme.palette.common.white,
      boxShadow:       "none",
    },

    [theme.breakpoints.down(1150)]: {
      fontSize: 13,
    },
  },

  homeIcon: {
    width: 100,
  },

  headerItemActive: {
    backgroundColor: theme.palette.primary.main,
    color:           theme.palette.common.white,
  },

  btnIcon: {
    marginRight: theme.spacing(1),
  },

}));

interface Props {
  headerItems: HeaderItemInterface[];
}

const HeaderDesktop = (props: Props) => {
  const { headerItems } = props;
  const classes = useStyles();

  const ButtonNode = (headerItem: HeaderItemInterface) => (
    <Button
      {...headerItem.onClick && {
        onClick: headerItem.onClick,
      }}
    >
      {headerItem.label}
    </Button>
  );

  return (
    <div className={classes.desktopWrapper}>
      <div className={classes.logoContainer}>
        <Link to={AppRoute.Home}>
          <Typography className={classes.logoLink}>Thrilled Web App</Typography>
        </Link>
      </div>
      <div className={classes.headerNavContainer}>
        {headerItems.map((item) => {
          if (item.url) {
            return (
              <Link to={item.url}>
                {ButtonNode(item)}
              </Link>
            );
          }

          return ButtonNode(item);
        })}
      </div>
    </div>
  );
};

export default HeaderDesktop;
