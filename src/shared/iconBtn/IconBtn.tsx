/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IconButtonProps } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  progress: {
    position:   "absolute",
    top:        "50%",
    left:       "50%",
    marginTop:  -12,
    marginLeft: -12,
  },
}));

interface Props extends IconButtonProps {
  loading: boolean;
  children: any;
}

const IconBtn = (props: Props) => {
  const classes = useStyles();

  const {
    children, loading, disabled, ...rest
  } = props;
  return (
    <IconButton
      disabled={disabled || loading}
      {...rest}
    >
      {children}
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </IconButton>
  );
};

IconBtn.defaultProps = {
  loading: false,
};

export default IconBtn;
