import { ActionTypes } from "redux/actions/ActionTypes";

interface State {
  user: any;
}

const initialState: State = {
  user: null,
};

export default function (state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.User.STATUS_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
