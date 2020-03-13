import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display:      "flex",
    alignItems:   "center",
    marginBottom: theme.spacing(2),
  },

  text: {
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  url: string;
  text: string;
}

const BackToPage = (props: Props) => {
  const classes = useStyles();
  const { url, text } = props;
  return (
    <Link to={url}>
      <div className={classes.root}>
        <Icon>arrow_back</Icon>
        <span className={classes.text}>{text}</span>
      </div>
    </Link>
  );
};

export default BackToPage;
