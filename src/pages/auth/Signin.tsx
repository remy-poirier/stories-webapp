import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Card, CardActions, CardContent, FormControlLabel, Switch, TextField,
} from "@material-ui/core";
import { Btn } from "shared";
import get from "lodash/get";
import isEmail from 'validator/lib/isEmail';
import { Routes } from "redux/actions/GlobalActions";
import globalConnect from "redux/actions/utils";
import { AppRoute } from "conf/routes";
import { RouteComponentProps } from "react-router";

interface SigninForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

interface Props extends RouteComponentProps{
  actions: Routes;
}

const Signin = (props: Props) => {
  const { actions, history } = props;
  const {
    handleSubmit, register, errors, getValues, setError,
  } = useForm();

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitForm = (form: any) => {

    setIsLoading(true);

    // @ts-ignore
    actions.user.isUsernameAvailable(form.username).then((isAvailable: boolean) => {
        if (isAvailable) {
          // @ts-ignore
          actions.user.signIn(form.email, form.password, form.username).then(() => {
            setIsLoading(false);
            history.push(AppRoute.Home);
          })
            .catch(() => setIsLoading(false));
        } else {
          setIsLoading(false);
          setError("username", "unicity", "Ce nom d'utilisateur est déjà utilisé");
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const hasError = (fieldName: keyof SigninForm): boolean => !!(errors && errors[fieldName]);

  const getErrorTextForField = (fieldName: keyof SigninForm): string => {
    if (errors && errors[fieldName]) {
      // @ts-ignore
      return get(errors, `${fieldName}.message`, "");
    }

    return "";
  };

  const togglePasswordVisibility = () => setIsPasswordHidden(!isPasswordHidden);

  const requiredValidator = {
    required: "Ce champ est requis",
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Card>
        <CardContent>
          <TextField
            inputRef={register({
              ...requiredValidator,
              validate: (value: string) => isEmail(value) || "Email invalide",
            })}
            name="email"
            label="Email"
            fullWidth
            error={hasError("email")}
            {...hasError("email") && {
              helperText: getErrorTextForField("email"),
            }}
          />

          <TextField
            inputRef={register({
              ...requiredValidator,
              minLength: {
                value: 3,
                message: "3 caractères minimum",
              },
              pattern: {
                value:   /^[a-zA-Z0-9]*$/,
                message: "Les caractères spéciaux ne sont pas autorisés",
              },
            })}
            name="username"
            label="Nom d'utilisateur"
            fullWidth
            error={hasError("username")}
            {...hasError("username") && {
              helperText: getErrorTextForField("username"),
            }}
          />

          <TextField
            inputRef={register({
              ...requiredValidator,
              minLength: {
                value: 8,
                message: "8 caractères minimum",
              },
            })}
            name="password"
            type={isPasswordHidden ? "password" : "text"}
            label="Mot de passe"
            fullWidth
            error={hasError("password")}
            {...hasError("password") && {
              helperText: getErrorTextForField("password"),
            }}
          />

          <TextField
            inputRef={register({
              ...requiredValidator,

              validate: (value: string) => value === getValues().password || "Les mots de passe doivent être identiques"
            })}
            name="passwordConfirm"
            label="Confirmation du mot de passe"
            type={isPasswordHidden ? "password" : "text"}
            fullWidth
            error={hasError("passwordConfirm")}
            {...hasError("passwordConfirm") && {
              helperText: getErrorTextForField("passwordConfirm"),
            }}
          />

          <FormControlLabel
            control={(
              <Switch
                checked={isPasswordHidden}
                onChange={togglePasswordVisibility}
                value="isPasswordHidden"
                color="primary"
              />
            )}
            label="Cacher les mots de passe"
          />
        </CardContent>
        <CardActions>
          <Btn color="primary" variant="outlined" type="submit" loading={isLoading}>
            Inscription
          </Btn>
        </CardActions>
      </Card>
    </form>
  );
};

export default globalConnect()(Signin);
