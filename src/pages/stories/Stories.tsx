import React, { useEffect, useState } from 'react';
import globalConnect from "redux/actions/utils";
import { Routes } from "redux/actions/GlobalActions";
import { RootState } from "redux/reducer/mainReducer";
import { getUser } from "redux/selectors/userSelector";
import { getStories } from "redux/selectors/storiesSelector";
import { Btn, ProgressIndicator } from "shared";
import { Story as StoryModel } from "models/Story";
import { Icon, makeStyles, Theme } from "@material-ui/core";
import Story from "pages/stories/Story";
import DummyStories from "pages/stories/DummyStories";
import FormStoryDialog from "pages/stories/edit/FormStoryDialog";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display:        "flex",
    flexWrap:       "wrap",
    justifyContent: "center",
  },

  actionsContainer: {
    display:        "flex",
    textAlign:      "right",
    justifyContent: "flex-end",
  },

}));

interface Props {
  actions: Routes;
  user: any;
  stories: StoryModel[];
}

const Stories = (props: Props) => {
  const { actions, user, stories } = props;

  const [fetchStories, setFetchStories] = useState<boolean>(true);
  const [storyToEdit, setStoryToEdit] = useState<StoryModel | undefined>(undefined);
  const [isUpdatingOrAddingStory, setIsUpdatingOrAddingStory] = useState<boolean>(false);
  const [isAddingStory, setIsAddingStory] = useState<boolean>(false)

  const classes = useStyles();

  useEffect(() => {
    // @ts-ignore
    actions.stories.get(user.id).then((doc: any) => {
      setFetchStories(false);
    })
      .catch(() => setFetchStories(false));
  }, []);

  const submitStory = (data: any) => {
    setIsUpdatingOrAddingStory(true);
    if (storyToEdit) {
      const newStory = {
        ...storyToEdit,
        ...data,
      };

      // @ts-ignore
      actions.stories.update(newStory).then(() => {
        setIsUpdatingOrAddingStory(false);
        setStoryToEdit(undefined);
      })
      .catch(() => {
        setIsUpdatingOrAddingStory(false)
      })
    } else {
      const newStory = {
        id:         uuidv4(),
        authorId:   user.id,
        authorName: user.displayName,
        isVisible:  false,
        ...data,
      };

      // @ts-ignore
      actions.stories.create(newStory).then(() => {
        setIsUpdatingOrAddingStory(false);
        setIsAddingStory(false);
      })
      .catch(() => {
        setIsUpdatingOrAddingStory(false);
        setIsAddingStory(false);
      });
    }
  };

  const onEditStoryClick = (story: StoryModel) => setStoryToEdit(story);

  const closeStoryToEdit = () => {
    setIsAddingStory(false);
    setStoryToEdit(undefined);
  }

  const onAddClick = () => setIsAddingStory(true);

  return (
    <>
      {fetchStories && (
        <ProgressIndicator />
      )}

      <div className={classes.actionsContainer}>
        <Btn onClick={onAddClick} color="primary" variant="outlined">
          <Icon>add</Icon>
          Ajouter une histoire
        </Btn>

      </div>

      <div className={classes.root}>
        {!fetchStories && stories.map((story) => (
          <Story
            key={story.id}
            story={story}
            onEditStoryClick={onEditStoryClick}
          />
        ))}
        <DummyStories />
      </div>

      {(storyToEdit || isAddingStory) && (
        <FormStoryDialog
          onClose={closeStoryToEdit}
          onSubmit={submitStory}
          story={storyToEdit}
          loading={isUpdatingOrAddingStory}
        />
      )}

    </>
  );
};

const stateToProps = (state: RootState) => ({
  user:    getUser(state),
  stories: getStories(state),
});

export default globalConnect(stateToProps)(Stories);
