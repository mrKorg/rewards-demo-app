import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const isDevelopment = process.env.NODE_ENV === "development";

export const history = createBrowserHistory();

const persistConfig = {
  key: "rewards-demo-app",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  // @ts-ignore
  router: connectRouter(history),
  ...reducers,
});

function configureStore() {
  const enhancers = [];
  const middlewares = [thunk, routerMiddleware(history)];

  // Add redux logger for dev mode
  if (isDevelopment) {
    const { createLogger } = require("redux-logger");
    const logger = createLogger({
      collapsed: true,
      // duration: true,
      // diff: true,
    });

    middlewares.push(logger);
  }

  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    // @ts-ignore
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    persistedReducer,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
}

export const store = configureStore();
export const persistor = persistStore(store);
