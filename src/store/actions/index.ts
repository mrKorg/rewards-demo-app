import APP from "store/actions/types";
import API from "utils/request";
interface Payload {
  [key: string]: any;
}
interface ActionTypes {
  type: string;
  payload?: Payload;
}

export const getRewards = (payload?: Payload) => (
  dispatch: (payload: ActionTypes) => void
) => {
  dispatch({
    type: APP.GET_REWARDS,
    payload,
  });
  return API.get("rewards", { params: payload?.values })
    .then((response: Payload) => {
      dispatch({
        type: APP.GET_REWARDS_SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error: Payload) => {
      dispatch({
        type: APP.GET_REWARDS_FAIL,
        payload: error.response,
      });
    });
};

export const putReward = (payload?: Payload) => (
  dispatch: (payload: ActionTypes) => void
) => {
  dispatch({
    type: APP.PUT_REWARD,
    payload,
  });
  return API.put(`rewards/${payload?.id}`, { values: payload?.values })
    .then((response: Payload) => {
      dispatch({
        type: APP.PUT_REWARD_SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error: Payload) => {
      dispatch({
        type: APP.PUT_REWARD_FAIL,
        payload: error.response,
      });
    });
};

export const getUsers = (payload?: Payload) => (
  dispatch: (payload: ActionTypes) => void
) => {
  dispatch({
    type: APP.GET_USERS,
    payload,
  });
  return API.get("users")
    .then((response: Payload) => {
      dispatch({
        type: APP.GET_USERS_SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error: Payload) => {
      dispatch({
        type: APP.GET_USERS_FAIL,
        payload: error.response,
      });
    });
};
