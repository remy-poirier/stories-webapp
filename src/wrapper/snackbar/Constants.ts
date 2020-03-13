import { Theme } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';

export const SnackbarTypes = Object.freeze({
  SUCCESS: "success",
  WARNING: "warning",
  ERROR:   "error",
  INFO:    "info",
});

export const getBackgroundColorAccordingToType = (theme: Theme, type?: string) => {
  switch (type) {
    case SnackbarTypes.SUCCESS:
      return green[600];
    case SnackbarTypes.ERROR:
      return theme.palette.error.dark;
    case SnackbarTypes.INFO:
      return theme.palette.primary.main;
    case SnackbarTypes.WARNING:
      return amber[700];
    default:
      return "#000000";
  }
}
