import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import _get from "lodash/get";

import { store } from "store";

// TODO: remove mocks when API is ready
let data = [
  {
    id: 1,
    user: 1,
    experience: "Trip to Hawaii",
    date: "10/23/2014",
    status: "new",
  },
  {
    id: 2,
    user: 1,
    experience: "The Bond Experience",
    date: "2/23/2015",
    status: "redeemed",
  },
  {
    id: 3,
    user: 2,
    experience: "Cruise around Alaska",
    date: "4/17/2014",
    status: "completed",
  },
  {
    id: 4,
    user: 2,
    experience: "Bladesmithing",
    date: "8/20/2015",
    status: "scheduled",
  },
  {
    id: 5,
    user: 2,
    experience: "Yerba Mate Tasting in Napa",
    date: "7/23/2015",
    status: "completed",
  },
  {
    id: 6,
    user: 2,
    experience: "Super Bowl Tickets",
    date: "1/2/2014",
    status: "redeemed",
  },
  {
    id: 7,
    user: 2,
    experience: "Warriors Tickets",
    date: "1/2/2014",
    status: "redeemed",
  },
  {
    id: 8,
    user: 2,
    experience: "Drive Bugatti Veyron",
    date: "1/2/2014",
    status: "redeemed",
  },
  {
    id: 9,
    user: 1,
    experience: "Kite Surfing Lessons",
    date: "1/2/2014",
    status: "redeemed",
  },
  {
    id: 10,
    user: 1,
    experience: "Something cool",
    date: "11/11/2011",
    status: "redeemed",
  },
  {
    id: 11,
    user: 2,
    experience: "Drive Lamborghini",
    date: "6/20/2013",
    status: "redeemed",
  },
  {
    id: 12,
    user: 2,
    experience: "World Food Tour",
    date: "1/1/2010",
    status: "redeemed",
  },
  {
    id: 13,
    user: 2,
    experience: "Sharks Tickets",
    date: "1/2/2014",
    status: "scheduled",
  },
  {
    id: 14,
    user: 2,
    experience: "Electric Daisy Carnival",
    date: "1/2/2014",
    status: "redeemed",
  },
  {
    id: 15,
    user: 1,
    experience: "Olympics",
    date: "2/2/2013",
    status: "new",
  },
  {
    id: 16,
    user: 2,
    experience: "Great Barrier Reef Snorkeling",
    date: "1/2/2014",
    status: "new",
  },
  {
    id: 17,
    user: 2,
    experience: "Wine Tasting",
    date: "10/17/2014",
    status: "completed",
  },
  {
    id: 18,
    user: 1,
    experience: "Biergarten",
    date: "1/2/2014",
    status: "completed",
  },
  {
    id: 19,
    user: 2,
    experience: "Trip to Europe",
    date: "11/2/2014",
    status: "new",
  },
  {
    id: 20,
    user: 1,
    experience: "Fishing Trip",
    date: "1/23/2015",
    status: "redeemed",
  },
];
const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onGet("/rewards").reply((config) => [
  200,
  {
    data,
  },
]);
mock.onGet("/users").reply(200, {
  data: [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sue Mae" },
  ],
});
mock.onPut(/\/rewards\/\d+/).reply((config) => [
  200,
  {
    data: JSON.parse(config.data),
  },
]);

const source = axios.CancelToken.source();
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  cancelToken: source.token,
});

instance.interceptors.request.use(
  (config) => {
    if (config.baseURL && !config.headers.Authorization) {
      const token = _get(store.getState(), "app.token", null);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
