import React from 'react';
import { Router, Switch } from "react-router";
import { Provider } from "react-redux";
import history from "utils/history";
import { Store } from "redux";
import { RootState } from "redux/reducer/mainReducer";
import { configureStore } from "redux/store/configureStore";
import Wrapper from "wrapper/Wrapper";
import { AppRoutes } from "conf/routes";
import { Route } from "react-router-dom";
import "./App.css"

const store: Store<RootState, any> = configureStore({});

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Wrapper>
          <Switch>
            {AppRoutes.map((route) => (
              <Route
                exact
                path={route.path}
                component={route.component}
                key={route.path}
              />
            ))}
          </Switch>
        </Wrapper>
      </Router>
    </Provider>
  )
};

export default App;
