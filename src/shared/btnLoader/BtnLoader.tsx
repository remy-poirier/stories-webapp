import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ButtonProps } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
  },

  progress: {
    position:  'absolute',
    top:       '50%',
    left:      '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface Props extends ButtonProps {
  loading: boolean;
  children: any;
}


const BtnLoader = (props: Props) => {
  const {
    loading, children, disabled, ...rest
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        {...rest}

        disabled={disabled || loading}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
};

BtnLoader.defaultProps = {
  loading: false,
};

export default BtnLoader;
