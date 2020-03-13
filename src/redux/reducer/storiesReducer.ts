import { Story } from "models/Story";
import { ActionTypes } from "redux/actions/ActionTypes";

interface State {
  stories: Story[];
}

const initialState: State = {
  stories: [],
};

export default function (state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.Stories.RECEIVE_ALL:
      return {
        ...state,
        stories: action.payload,
      };
    case ActionTypes.Stories.UPDATE:
      return {
        ...state,
        stories: state.stories.map((story) => {
          if (story.id === action.payload.id) {
            return action.payload;
          }
          return story;
        }),
      };
    case ActionTypes.Stories.CREATE:
      return {
        ...state,
        stories: [
          ...state.stories,
          action.payload,
        ],
      };
    default:
      return state;
  }
}
