import produce from "immer";

import APP from "store/actions/types";
import { RewardsState } from "store/types";

const initialState: RewardsState = {
  data: [],
  tabs: [],
  loading: false,
  error: undefined,
};

function rewardsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case APP.GET_REWARDS:
    case APP.PUT_REWARD:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case APP.GET_REWARDS_SUCCESS:
      return produce(state, (draft) => {
        draft.loading = false;
        if (Array.isArray(payload?.data)) {
          draft.data = payload.data;
          const tabsSet = new Set();
          payload.data.forEach((item) => tabsSet.add(item.status));
          // @ts-ignore
          draft.tabs = Array.from(tabsSet);
        }
      });

    case APP.PUT_REWARD_SUCCESS:
      return produce(state, (draft) => {
        draft.loading = false;
        const updatedReward = payload.data.values;
        draft.data = state.data.map((item) =>
          item.id === updatedReward.id ? updatedReward : item
        );
      });

    case APP.GET_REWARDS_FAIL:
    case APP.PUT_REWARD_FAIL:
      return produce(state, (draft) => {
        draft.loading = false;
        if (payload?.message) {
          draft.error = payload.message;
        }
      });

    default:
      return state;
  }
}

export default rewardsReducer;
