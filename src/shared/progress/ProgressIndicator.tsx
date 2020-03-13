import React from 'react';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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

const ProgressIndicator = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingProgress}>
      <Typography color="textSecondary">Chargement...</Typography>
      <LinearProgress className={classes.linearProgress} />
    </div>
  );
};

export default ProgressIndicator;
