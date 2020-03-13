import React from 'react';
import { RootState } from 'redux/reducer/mainReducer';
import { Snackbar as Snack } from "@material-ui/core";
import { Routes } from 'redux/actions/GlobalActions';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { getBackgroundColorAccordingToType, SnackbarTypes } from 'wrapper/snackbar/Constants';
import Icon from '@material-ui/core/Icon';
import globalConnect from "redux/actions/utils";

const useStyles = makeStyles((theme: any) => ({
  messageContainer: {
    display:    "flex",
    alignItems: "center",
  },

  messageIcon: {
    marginRight: theme.spacing(1),
    display:     "flex",
  },

  messageContent: {
    flex: 1,
  },

  root: (props: any) => ({
    backgroundColor: getBackgroundColorAccordingToType(theme, props.type),
    color:           theme.palette.common.white,
  }),
}));

interface Props {
  type?: string;
  message?: string;
  actions: Routes;
}

const Snackbar = (props: Props) => {
  const { type, message, actions } = props;
  const classes = useStyles({
    type,
  });

  const closeSnack = () => actions.hideSnackbar();
  const getSnackIcon = (): string => {
    switch (type) {
      case SnackbarTypes.SUCCESS:
        return "check_circle";
      case SnackbarTypes.ERROR:
        return "error";
      case SnackbarTypes.WARNING:
        return "warning";
      case SnackbarTypes.INFO:
      default:
        return "info";
    }
  };

  if (type) {
    return (
      <Snack
        open
        autoHideDuration={5000}
        onClose={closeSnack}
      >
        <SnackbarContent
          className={classes.root}
          message={(
            <div className={classes.messageContainer}>
              <div className={classes.messageIcon}>
                <Icon>{getSnackIcon()}</Icon>
              </div>
              <div className={classes.messageContent}>
                {message}
              </div>
            </div>
          )}
        />

      </Snack>
    );
  }
  return null;
};

const state2props = (state: RootState): object => ({
  type:    state.snackbar.type,
  message: state.snackbar.message,
});

export default globalConnect(state2props)(Snackbar);
