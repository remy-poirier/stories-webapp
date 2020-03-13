import { SnackbarTypes } from "wrapper/snackbar/Constants";
import { ActionTypes } from "redux/actions/ActionTypes";

interface State {
  type?: string;
  message?: string;
}

const initialState: State = {
  type:    undefined,
  message: undefined,
};

export default function snackbarReducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.Snackbar.SHOW:
      return {
        ...state,
        type:    action.snackType,
        message: action.message,
      };
    case ActionTypes.Snackbar.HIDE:
      return initialState;
    default:
      return state;
  }
}
