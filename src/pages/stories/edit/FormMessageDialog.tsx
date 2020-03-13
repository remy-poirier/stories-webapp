import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { Message, SenderTypes } from "models/Message";
import { Btn } from "shared";
import get from "lodash/get";

const useStyles = makeStyles((theme: Theme) => ({
  authorContainer: {
    display: "flex",
  },
}));

interface Props {
  onClose: () => void;
  onSubmit: (data: any) => void;
  message?: Message;
  witnessName: string;
  victimName: string;
  loading: boolean;
}

interface MessageForm {
  text: string;
  from: string;
}

const FormMessageDialog = (props: Props) => {
  const {
    onClose, message, onSubmit, victimName, witnessName, loading,
  } = props;

  const classes = useStyles();

  const {
    handleSubmit, errors, control,
  } = useForm<Message>();

  const hasError = (fieldName: keyof MessageForm): boolean => !!(errors && errors[fieldName]);

  const getErrorTextForField = (fieldName: keyof MessageForm): string => {
    if (errors && errors[fieldName]) {
      return get(errors, `${fieldName}.message`, "");
    }

    return "";
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {message ? "Edition du message" : "Ajout d'un message"}
        </DialogTitle>
        <DialogContent>
          <Controller
            as={TextField}
            control={control}
            name="text"
            label="Message"
            fullWidth
            error={hasError("text")}
            {...hasError("text") && {
              helperText: getErrorTextForField("text"),
            }}
            defaultValue={message ? message.text : ""}
          />

          <FormControl className={classes.authorContainer}>
            <InputLabel id="author">Auteur</InputLabel>
            <Controller
              as={(
                <Select>
                  <MenuItem value={SenderTypes.Witness}>{witnessName} (Témoin)</MenuItem>
                  <MenuItem value={SenderTypes.Victim}>{victimName} (Victime)</MenuItem>
                  <MenuItem value={SenderTypes.Narrator}>Narrateur/Voix-off</MenuItem>
                </Select>
              )}
              control={control}
              name="from"
              label="Auteur"
              fullWidth
              error={hasError("from")}
              {...hasError("from") && {
                helperText: getErrorTextForField("from"),
              }}
              defaultValue={message ? message.from : ""}
              labelId="author"
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Btn disabled={loading} onClick={onClose}>Annuler</Btn>
          <Btn loading={loading} type="submit" color="primary" variant="outlined">Sauvegarder</Btn>
        </DialogActions>
      </form>

    </Dialog>
  );
};

export default FormMessageDialog;
