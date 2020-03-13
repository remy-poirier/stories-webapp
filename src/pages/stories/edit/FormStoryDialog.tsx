import React from 'react';
import { Story } from "models/Story";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles, MenuItem, Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { Btn } from "shared";
import get from "lodash/get";
import { SenderTypes } from "models/Message";

const useStyles = makeStyles((theme: Theme) => ({
  authorContainer: {
    display: "flex",
  },
}));

interface Props {
  story?: Story;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading: boolean;
}

interface StoryForm {
  description: string;
  category: string;
  witnessName: string;
  victimName: string;
  imageUrl: string;
  name: string;
}

const FormStoryDialog = (props: Props) => {
  const { story, onClose, onSubmit, loading } = props;

  const {
    handleSubmit, control, errors,
  } = useForm();

  const classes = useStyles();

  const hasError = (fieldName: keyof StoryForm): boolean => !!(errors && errors[fieldName]);

  const getErrorTextForField = (fieldName: keyof StoryForm): string => {
    if (errors && errors[fieldName]) {
      // @ts-ignore
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
          {story ? "Edition de l'histoire" : "Nouvelle histoire"}
        </DialogTitle>
        <DialogContent>
          <Controller
            as={TextField}
            control={control}
            name="name"
            label="Nom de l'histoire"
            fullWidth
            error={hasError("name")}
            {...hasError("name") && {
              helperText: getErrorTextForField("name"),
            }}
            defaultValue={story ? story.name : ""}
            rules={{
              required: "Ce champ est requis",
            }}
          />
          <Controller
            as={TextField}
            control={control}
            name="witnessName"
            label="Témoin - Destinataire des message"
            fullWidth
            error={hasError("witnessName")}
            {...hasError("witnessName") && {
              helperText: getErrorTextForField("witnessName"),
            }}
            defaultValue={story ? story.witnessName : ""}
            rules={{
              required: "Ce champ est requis",
            }}
          />
          <Controller
            as={TextField}
            control={control}
            name="victimName"
            label="Victime - Emetteur des messages"
            fullWidth
            error={hasError("victimName")}
            {...hasError("victimName") && {
              helperText: getErrorTextForField("victimName"),
            }}
            defaultValue={story ? story.victimName : ""}
            rules={{
              required: "Ce champ est requis",
            }}
          />
          <Controller
            as={TextField}
            control={control}
            label="Description de l'histoire"
            name="description"
            fullWidth
            error={hasError("description")}
            {...hasError("description") && {
              helperText: getErrorTextForField("description"),
            }}
            defaultValue={story ? story.description : ""}
            rules={{
              required: "Ce champ est requis",
            }}
          />
          <FormControl className={classes.authorContainer}>
            <InputLabel id="author">Catégorie</InputLabel>
            <Controller
              as={(
                <Select
                  error={hasError("category")}
                  {...hasError("category") && {
                    helperText: getErrorTextForField("category"),
                  }}
                >
                  <MenuItem value="Horreur">Horreur</MenuItem>
                  <MenuItem value="Romance">Romance</MenuItem>
                  <MenuItem value="Science-Fiction">Science-Fiction</MenuItem>
                  <MenuItem value="Paranormal">Paranormal</MenuItem>
                  <MenuItem value="Thriller">Thriller</MenuItem>
                </Select>
              )}
              control={control}
              name="category"
              fullWidth

              defaultValue={story ? story.category : ""}
              rules={{
                required: "Ce champ est requis",
              }}
            />
          </FormControl>
          <Controller
            as={TextField}
            control={control}
            name="imageUrl"
            label="Url de l'image d'illustration"
            fullWidth
            error={hasError("imageUrl")}
            {...hasError("imageUrl") && {
              helperText: getErrorTextForField("imageUrl"),
            }}
            defaultValue={story ? story.imageUrl : ""}
            rules={{
              required: "Ce champ est requis",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Btn disabled={loading} onClick={onClose}>Annuler</Btn>
          <Btn loading={loading} variant="outlined" color="primary" type="submit">Sauvegarder</Btn>
        </DialogActions>
      </form>

    </Dialog>
  );
};

export default FormStoryDialog;
