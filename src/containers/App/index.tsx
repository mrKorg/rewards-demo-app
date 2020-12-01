import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import { Switch, Redirect, Route } from "react-router";

import Layout from "components/Layout";
import Rewards from "containers/Rewards";
import Reward from "containers/Reward";
import NotFound from "containers/NotFound";

import { getRewards, getUsers } from "store/actions";

function App() {
  const dispatch = useDispatch();
  const [activeTab] = useQueryParam("tab", StringParam);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRewards({ values: { status: activeTab } }));
  }, [activeTab, dispatch]);

  return (
    <Layout>
      <Switch>
        <Redirect from="/" to="/rewards" exact />
        <Route path="/rewards/:id" component={Reward} exact />
        <Route path="/rewards" component={Rewards} exact />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
