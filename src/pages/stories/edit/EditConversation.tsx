import React, { useEffect, useState } from 'react';
import globalConnect from "redux/actions/utils";
import { Routes } from "redux/actions/GlobalActions";
import { RouteComponentProps } from "react-router";
import { Btn, IconBtn, ProgressIndicator } from "shared";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RootState } from "redux/reducer/mainReducer";
import { getConversation } from "redux/selectors/conversationSelector";
import { Conversation } from "models/Story";
import {
  Backdrop,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Message, SenderTypes } from "models/Message";
import FormMessageDialog from "pages/stories/edit/FormMessageDialog";
import { v4 as uuidv4 } from 'uuid';
import BackToPage from "shared/backToPage/BackToPage";
import { AppRoute } from "conf/routes";
import { SnackbarTypes } from "wrapper/snackbar/Constants";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) => ({
  messageItem: {
    margin:      theme.spacing(1, 0),
    flex:        1,
    marginRight: theme.spacing(2),
  },

  messageContainer: {
    display:    "flex",
    alignItems: "center",
  },

  addMessage: {
    marginTop: theme.spacing(2),
  },

  addMessageContainer: {
    display:        "flex",
    flexDirection:  "column",
    justifyContent: "center",
    alignItems:     "center",
    cursor:         "pointer",
    padding:        theme.spacing(2, 0),
  },

  addMessageIcon: {
    color:    theme.palette.text.secondary,
    fontSize: 35,
  },

  addMessageText: {
    fontSize: 20,
  },

  backdrop: {
    zIndex: 99999,
    color:  theme.palette.common.white,
  },

  fromMessage: {
    textAlign: "right",
  },

  narratorMessage: {
    textAlign: "center",
  },

}));

interface Props extends RouteComponentProps {
  actions: Routes;
  conversation: Conversation;
}

interface MatchParams {
  storyId?: string;
}

const reorder = (currentMessages: Message[], sourceIndex: number, destinationIndex: number) => {
  const result = Array.from(currentMessages);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result.map((message, index) => ({
    ...message,
    order: index,
  }));
};

const EditConversation = (props: Props) => {
  const { actions, match, conversation } = props;
  const { params }: {params: MatchParams} = match;

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [internalMessages, setInternalMessages] = useState<Message[]>([]);

  const [messageToEdit, setMessageToEdit] = useState<Message | undefined>(undefined);
  const [isAddMessageDialogOpen, setIsAddMessageDialogOpen] = useState<boolean>(false);
  const [isDialogActionsLoading, setIsDialogActionsLoading] = useState<boolean>(false);
  const [messageToDelete, setMessageToDelete] = useState<string | undefined>(undefined);
  const [isDeletingMessage, setIsDeletingMessage] = useState<boolean>(false);
  const [isReorderingMessages, setIsReorderingMessages] = useState<boolean>(false)

  const classes = useStyles();

  useEffect(() => {
    if (conversation && conversation.messages) {
      setInternalMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    if (params && params.storyId) {
      // @ts-ignore
      actions.conversation.get(params.storyId).then(() => setIsFetching(false))
        .catch(() => setIsFetching(false))
    }
  }, []);

  useEffect(() => {
    setInternalMessages(conversation.messages);
  }, [conversation.messages]);

  const showSuccessMessage = () => {
    actions.showSnackbar(SnackbarTypes.SUCCESS, "Modifications effectuées avec succès");
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newMessages = reorder(
      internalMessages,
      result.source.index,
      result.destination.index,
    );

    setIsReorderingMessages(true);

    // @ts-ignore
    actions.conversation.reorderMessages(conversation, newMessages).then(() => {
      showSuccessMessage();
      setIsReorderingMessages(false);
      actions.conversation.get(conversation.id);
    })
      .catch(() => {
        setIsReorderingMessages(false);
      })

    setInternalMessages(newMessages);
  };

  const onEditMessage = (message: Message) => () => setMessageToEdit(message);

  const closeMessageDialog = () => {
    setMessageToEdit(undefined);
    setIsAddMessageDialogOpen(false);
  };

  const onAddMessageClick = () => setIsAddMessageDialogOpen(true);

  const onSaveEditedMessage = (data: any) => {
    setIsDialogActionsLoading(true);

    if (messageToEdit) {
      // @ts-ignore
      actions.conversation.editMessage({...messageToEdit, ...data}).then(() => {
        showSuccessMessage();
        setIsDialogActionsLoading(false);
        setMessageToEdit(undefined)
      })
        .catch(() => {
          setIsDialogActionsLoading(false);
        });
    } else {
      setIsAddMessageDialogOpen(true);

      const newMessage = {
        id:      uuidv4(),
        text:    data.text,
        from:    data.from,
        order:   internalMessages.length > 0 ? internalMessages[internalMessages.length - 1].order + 1 : 0,
        storyId: conversation.id,
      };
      // @ts-ignore
      actions.conversation.addMessage(newMessage).then(() => {
        showSuccessMessage();
        setIsAddMessageDialogOpen(false);
        setIsDialogActionsLoading(false);
      })
        .catch(() => {
          setIsAddMessageDialogOpen(false);
          setIsDialogActionsLoading(false);
        });
    }
  };

  const onDeleteMessage = (messageId: string) => () => {
    setMessageToDelete(messageId);
  };

  const closeDeleteMessageDialog = () => setMessageToDelete(undefined);

  const deleteMessage = () => {
    if (messageToDelete) {
      setIsDeletingMessage(true)
      // @ts-ignore
      actions.conversation.deleteMessage(messageToDelete).then(() => {
        showSuccessMessage();
        setIsDeletingMessage(false);
        setMessageToDelete(undefined);
      })
        .catch(() => {
          setIsDeletingMessage(false);
        });
    }
  };

  const getFrom = (from: SenderTypes) => {
    switch (from) {
      case SenderTypes.Victim:
        return conversation.victimName;
      case SenderTypes.Witness:
        return conversation.witnessName;
      case SenderTypes.Narrator:
      default:
        return "Narrateur";
    }
  };

  return (
    <>
      <BackToPage url={AppRoute.Stories} text="Retour à la liste des histoires" />
      <Backdrop className={classes.backdrop} open={isReorderingMessages} />
      {isFetching && (
        <ProgressIndicator />
      )}

      {!isFetching && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="messageEditor">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {internalMessages.map((message, index) => (
                    <div key={message.id} className={classes.messageContainer}>
                      <Draggable draggableId={message.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            className={classNames(
                              classes.messageItem,
                              message.from === SenderTypes.Victim ? classes.fromMessage : undefined,
                              message.from === SenderTypes.Narrator ? classes.narratorMessage : undefined,
                            )}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CardContent>
                              {message.text}
                            </CardContent>
                            <Divider />
                            <CardContent>
                              {getFrom(message.from)}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                      <IconBtn onClick={onEditMessage(message)}>
                        <Icon>
                          edit
                        </Icon>
                      </IconBtn>
                      <IconBtn onClick={onDeleteMessage(message.id)}>
                        <Icon>
                          delete
                        </Icon>
                      </IconBtn>
                    </div>

                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Card className={classes.addMessage}>
            <CardContent onClick={onAddMessageClick} className={classes.addMessageContainer}>
              <Icon className={classes.addMessageIcon}>
                add
              </Icon>
              <Typography variant="h4" color="textSecondary" className={classes.addMessageText}>
                Ajouter un message
              </Typography>
            </CardContent>
          </Card>
        </>
      )}


      {(messageToEdit || isAddMessageDialogOpen) && (
        <FormMessageDialog
          onClose={closeMessageDialog}
          onSubmit={onSaveEditedMessage}
          witnessName={conversation.witnessName}
          victimName={conversation.victimName}
          message={messageToEdit}
          loading={isDialogActionsLoading}
        />
      )}


      {messageToDelete && (
        <Dialog
          open
          onClose={closeDeleteMessageDialog}
        >
          <DialogTitle>
            Confirmer la suppression du message
          </DialogTitle>
          <DialogContent>
            Attention cette action est irréversible, veuillez confirmer.
          </DialogContent>
          <DialogActions>
            <Btn disabled={isDeletingMessage} onClick={closeDeleteMessageDialog}>Annuler</Btn>
            <Btn loading={isDeletingMessage} variant="outlined" color="primary" onClick={deleteMessage}>Confirmer</Btn>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const stateToProps = (state: RootState) => ({
  conversation: getConversation(state),
});

export default globalConnect(stateToProps)(EditConversation);
