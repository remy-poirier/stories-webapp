import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
  },
}));

const DummyStories = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root} />
      <div className={classes.root} />
      <div className={classes.root} />
      <div className={classes.root} />
      <div className={classes.root} />
      <div className={classes.root} />
      <div className={classes.root} />
    </>
  );
};

export default DummyStories;
