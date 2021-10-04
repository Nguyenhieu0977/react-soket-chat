import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./Reducer";
import { setCurrentUser, setToken } from "./components/login/LoginActions"; // new imports
import { isEmpty } from "./utils/Utils"; // new imports

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, initialState = {} }) => {
  const history = createBrowserHistory();
  const middleware = [thunk, routerMiddleware(history)];

  // const store = createStore(rootReducer(history), composeWithDevTools(
  //   initialState,
  //   applyMiddleware(...middleware),

  //   // other store enhancers if any
  // ));

  const store = createStore(
    rootReducer(history),
    initialState,
    applyMiddleware(...middleware),
    // + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  // check localStorage
  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(setToken(localStorage.getItem("token")));
  }
  if (!isEmpty(localStorage.getItem("user"))) {
    const user = JSON.parse(localStorage.getItem("user"));
    store.dispatch(setCurrentUser(user, ""));
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};