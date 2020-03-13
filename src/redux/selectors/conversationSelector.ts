import { RootState } from "redux/reducer/mainReducer";
import { createSelector } from 'reselect';

const extractConversation = (state: RootState) => state.conversation.conversation;
const conversationSelector = createSelector(
  extractConversation,
  (conversation) => conversation,
);

export const getConversation = (state: RootState) => conversationSelector(state);
