import React, { useState } from 'react';
import { Routes } from "redux/actions/GlobalActions";
import { RouteComponentProps } from "react-router";
import globalConnect from "redux/actions/utils";
import { useForm } from "react-hook-form";
import { Card, CardActions, CardContent, FormControlLabel, Switch, TextField } from "@material-ui/core";
import isEmail from "validator/lib/isEmail";
import get from "lodash/get";
import { Btn } from "shared";
import { AppRoute } from "conf/routes";

interface LoginForm {
  email: string;
  password: string;
}

interface Props extends RouteComponentProps {
  actions: Routes;
}

const Login = (props: Props) => {
  const { actions, history } = props;
  const {
    handleSubmit, register, errors,
  } = useForm();

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitForm = (form: any) => {
    // @ts-ignore
    actions.user.login(form.email, form.password).then(() => {
        setIsLoading(false);
        history.push(AppRoute.Home);
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const hasError = (fieldName: keyof LoginForm): boolean => !!(errors && errors[fieldName]);

  const getErrorTextForField = (fieldName: keyof LoginForm): string => {
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
            Connexion
          </Btn>
        </CardActions>
      </Card>
    </form>
  );
};

export default globalConnect()(Login);
