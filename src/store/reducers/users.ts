import produce from "immer";

import APP from "store/actions/types";
import { UsersState } from "store/types";

const initialState: UsersState = {
  data: [],
  loading: false,
  error: undefined,
};

function usersReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case APP.GET_USERS:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case APP.GET_USERS_SUCCESS:
      return produce(state, (draft) => {
        draft.loading = false;
        if (Array.isArray(payload?.data)) {
          draft.data = payload.data;
        }
      });

    case APP.GET_USERS_FAIL:
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

export default usersReducer;
