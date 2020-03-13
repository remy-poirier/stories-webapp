import React, { useState } from 'react';
import globalConnect from "redux/actions/utils";
import { RootState } from "redux/reducer/mainReducer";
import { getUser } from "redux/selectors/userSelector";
import { Paper, Tab, Tabs } from "@material-ui/core";
import Login from "pages/auth/Login";
import Signin from "pages/auth/Signin";

interface Props {
  user: any;
}

const Auth = (props: Props) => {
  const { user } = props;

  const [authTab, setAuthTab] = useState<number>(0);
  const onChangeAuthTab = (event: any, newValue: number) => setAuthTab(newValue);

  return (
    <div>
      {user && (
        <>
          Afficher un genre de page profil
        </>
      )}
      {!user && (
        <Paper>
          <Tabs value={authTab} onChange={onChangeAuthTab}>
            <Tab label="Connexion" />
            <Tab label="Inscription" />
          </Tabs>
          {authTab === 0 && <Login />}
          {authTab === 1 && <Signin />}
        </Paper>
      )}
    </div>
  );
};

const stateToProps = (state: RootState) => ({
  user: getUser(state),
});

export default globalConnect(stateToProps)(Auth);
