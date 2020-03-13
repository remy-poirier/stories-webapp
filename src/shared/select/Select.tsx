import React from 'react';
import {
  FormControl, InputLabel, Select as MuiSelect, SelectProps, Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 300,
    margin:   theme.spacing(1, 0),
  },
}));

interface Props extends SelectProps {
  label: string;
  children: any;
}

const Select = (props: Props) => {
  const { label, children, ...rest } = props;
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" size="small" className={classes.root}>
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <MuiSelect
        labelWidth={labelWidth}
        {...rest}
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
