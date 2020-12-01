import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import {
  QueryParamProvider,
  ExtendedStringifyOptions,
  transformSearchStringJsonSafe,
} from "use-query-params";

import App from "containers/App";
import { store, persistor, history } from "store";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/antd.css";
import "./index.css";

const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryParamProvider
          ReactRouterRoute={Route}
          stringifyOptions={queryStringifyOptions}
        >
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </QueryParamProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
