import { Conversation } from "models/Story";
import { ActionTypes } from "redux/actions/ActionTypes";

interface State {
  conversation: Conversation;
}

const initialState: State = {
  conversation: {
    name:        "Chargement",
    description: "",
    imageUrl:    "",
    authorId:    "",
    authorName:  "Admin",
    id:          "",
    messages:    [],
    victimName:  "",
    witnessName: "",
    category:    "",
    isVisible:   false,
  },
};

export default function (state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.Conversation.RECEIVE:
      return {
        ...state,
        conversation: action.payload,
      };
    case ActionTypes.Conversation.ADD_MESSAGE:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [
            ...state.conversation.messages,
            action.payload,
          ],
        },
      };
    case ActionTypes.Conversation.DELETE_MESSAGE:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: state.conversation.messages.filter((message) => message.id !== action.payload),
        },
      };
    case ActionTypes.Conversation.UPDATE_MESSAGE:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: state.conversation.messages.map((message) => {
            if (message.id === action.payload.id) {
              return action.payload;
            }

            return message;
          }),
        },
      };
    default:
      return state;
  }
}
