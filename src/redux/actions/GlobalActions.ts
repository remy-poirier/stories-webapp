import { ActionTypes } from "redux/actions/ActionTypes";
import bindActionCreators from "redux/actions/bindActionCreators";
import { auth, db } from "conf/firebase/firebase";
import { User } from "models/User";
import { Conversation, Story } from "models/Story";
import { Message } from "models/Message";

const actions = {
  user: {

    fetchUser: (email: string) => (dispatch: any) => db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          dispatch({
            type:    ActionTypes.User.STATUS_UPDATE,
            payload: querySnapshot.docs[0].data()
          })
        }
      }),


    isUsernameAvailable: (username: string) => (dispatch: any) => db.collection("users")
      .where("displayName", "==", username)
      .get()
      .then((querySnapshot) => querySnapshot.size === 0)
      .catch(() => true),

    signIn: (email: string, password: string, username: string) => (dispatch: any) => auth.createUserWithEmailAndPassword(
      email, password,
    )
      .then(() => {
        const { currentUser } = auth;
        const user: User = {
          id:          currentUser ? currentUser.uid : "",
          displayName: username,
          isAdmin:     false,
          email,
        };

        return db.collection("users")
          .doc(user.id)
          .set(user)
          .then(() => true)
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      }),

    logout: () => (dispatch: any) => auth.signOut()
      .then(() => {
        dispatch({
          type:    ActionTypes.User.STATUS_UPDATE,
          payload: null,
        });
      }),

    login: (email: string, password: string) => (dispatch: any) => auth.signInWithEmailAndPassword(email, password)
  },

  stories: {
    get: (userId: string) => (dispatch: any) => db.collection("stories")
      .where("authorId", "==", userId)
      .get()
      .then((querySnapshot) => {
        const stories: Story[] = [];
        querySnapshot.forEach((doc) => {
          stories.push(doc.data() as Story);
        });
        dispatch({
          type:    ActionTypes.Stories.RECEIVE_ALL,
          payload: stories,
        });
        return stories;
      }),

    update: (story: Story) => (dispatch: any) => {
      return db.collection("stories")
        .doc(story.id)
        .set(story)
        .then(() => {
          dispatch({
            type:    ActionTypes.Stories.UPDATE,
            payload: story,
          });
          return story;
        })
        .catch((error) => {
          throw error;
        });
    },

    create: (story: Story) => (dispatch: any) => {
      return db.collection("stories")
        .doc(story.id)
        .set(story)
        .then(() => {
          dispatch({
            type:    ActionTypes.Stories.CREATE,
            payload: story,
          });
          return story;
        })
        .catch((error) => {
          throw error;
        });
    },
  },

  conversation: {
    get: (storyId: string) => (dispatch: any) => db.collection("stories")
      .doc(storyId)
      .get()
      .then((doc) => {
        let finalObj: any = {};
        if (doc.exists) {
          const story = doc.data() as Story;
          finalObj = story;

          db.collection("messages")
            .where("storyId", "==", story.id)
            .orderBy("order")
            .get()
            .then((querySnapshot) => {
              const messages: Message[] = [];
              querySnapshot.forEach((msg) => {
                messages.push(msg.data() as Message);
              });

              finalObj.messages = messages;

              dispatch({
                type:    ActionTypes.Conversation.RECEIVE,
                payload: finalObj as Story,
              });
            })
            .catch((error) => {
              throw error;
            });
        }

        return finalObj;
      }),

    reorderMessages: (conversation: Conversation, messages: Message[]) => (dispatch: any) => {
      // First delete all messages
      const batch = db.batch();
      conversation.messages.forEach((doc) => {
        batch.delete(
          db.collection("messages").doc(doc.id),
        );
      });

      messages.forEach((message) => {
        const newMessageRef = db.collection("messages").doc(message.id)
        batch.set(newMessageRef, message);
      });

      // Then add the new ones
      return batch.commit();
    },

    addMessage: (message: Message) => (dispatch: any) => {
      return db.collection("messages")
        .doc(message.id)
        .set(message)
        .then(() => {
          dispatch({
            type:    ActionTypes.Conversation.ADD_MESSAGE,
            payload: message,
          });
        })
        .catch((error) => {
          throw error;
        });
    },

    deleteMessage: (messageId: string) => (dispatch: any) => {
      return db.collection("messages")
        .doc(messageId)
        .delete()
        .then(() => {
          dispatch({
            type:    ActionTypes.Conversation.DELETE_MESSAGE,
            payload: messageId,
          });
        })
        .catch((error) => {
          throw error;
        });
    },

    editMessage: (message: Message) => (dispatch: any) => {
      return db.collection("messages")
        .doc(message.id)
        .set(message)
        .then(() => {
          dispatch({
            type:    ActionTypes.Conversation.UPDATE_MESSAGE,
            payload: message,
          });
        })
        .catch((error) => {
          throw error;
        });
    },
  },

  showSnackbar: (snackType: string, message: string) => ({
    type: ActionTypes.Snackbar.SHOW,
    snackType,
    message,
  }),

  hideSnackbar: () => ({
    type: ActionTypes.Snackbar.SHOW,
  }),
};

export type Routes = typeof actions;
export const routes = { actions };
export const actionBuilder = (dispatch: any) => bindActionCreators(routes, dispatch);
