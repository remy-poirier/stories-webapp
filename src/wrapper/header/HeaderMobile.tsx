import React from 'react';
import { HeaderItemInterface } from "wrapper/header/Constants";
import { makeStyles } from '@material-ui/core/styles';
import { AppRoute } from "conf/routes";
import { Divider, Drawer, Icon, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { IconBtn } from "shared";

interface Props {
  headerItems: HeaderItemInterface[];
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
}

const useStyles = makeStyles((theme: any) => ({
  mobileHeader: {
    height:  60,
    display: "flex",
    flex:    1,
    alignItems: "center",
    marginRight: 60,

    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      display: "none",
    },
  },

  baseMobileIcon: {
    height:     60,
    width:      60,
    fontSize:   30,
    lineHeight: "60px",
    textAlign:  "center",
  },

  mobileLogoContainer: {
    height:    60,
    flex:      1,
    textAlign: "center",
  },

  mobileLogo: {
    height:    50,
    marginTop: 5,
  },

  drawer: {
    minWidth: 240,
  },

  drawerHeader: {
    display:        'flex',
    alignItems:     'center',
    padding:        theme.spacing(0, 1),
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },

  appTitle: {
    color: theme.palette.primary.contrastText,
    lineHeight: "60px",
  },

  listItemText: {
    color: theme.palette.common.white,
  }


}));

const HeaderMobile = (props: Props) => {
  const { headerItems, toggleDrawer, isDrawerOpen } = props;
  const classes = useStyles();

  const onHeaderItemClick = (headerItem: HeaderItemInterface) => () => {
    if (headerItem.onClick) {
      headerItem.onClick()
    }
    toggleDrawer();
  };

  const ListItemNode = (headerItem: HeaderItemInterface) => {
    return (
      <ListItem onClick={onHeaderItemClick(headerItem)} button>
        <ListItemText className={classes.listItemText} primary={headerItem.label} />
      </ListItem>
    )
  };

  return (
    <>
      <div className={classes.mobileHeader}>
        <Icon
          onClick={toggleDrawer}
          className={classNames(classes.baseMobileIcon)}
        >
          menu
        </Icon>
        <div className={classes.mobileLogoContainer}>
          <Link to={AppRoute.Home}>
            <Typography className={classes.appTitle}>Thrilled Web App</Typography>
          </Link>
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconBtn onClick={toggleDrawer}>
            <Icon>chevron_left</Icon>
          </IconBtn>
        </div>
        <Divider />
        <List>
          {headerItems.map((headerItem) => {
            if (headerItem.url) {
              return (
                <Link to={headerItem.url}>
                  {ListItemNode(headerItem)}
                </Link>
              );
            }
            return ListItemNode(headerItem);
          })}
        </List>
      </Drawer>
    </>
  );
};

export default HeaderMobile;
