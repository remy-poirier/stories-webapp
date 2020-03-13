import React from 'react';
import { Story as StoryModel } from "models/Story";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  makeStyles,
  Theme, Tooltip,
  Typography
} from "@material-ui/core";
import { Btn, IconBtn } from "shared";
import { AppRoute } from "conf/routes";
import { Link } from "react-router-dom";

interface StyleProps {
  backgroundImage: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width:    368,
    display:  "inline-block",
    overflow: "hidden",
    margin:   theme.spacing(1, 2),
  },

  image: (props: StyleProps) => ({
    height:             250,
    backgroundSize:     "cover",
    backgroundPosition: "center",
    backgroundImage:    `url('${props.backgroundImage}')`,
    position:           "relative",
  }),

  storyTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize:   18,
  },

  storyDescription: {
    position:   "absolute",
    bottom:     0,
    left:       0,
    right:      0,
    top:        0,
    background: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8) 100%)`,
  },

  storyDescriptionText: {
    zIndex:     2,
    display:    "flex",
    height:     "100%",
    flex:       1,
    alignItems: "flex-end",
    position:   "relative",
  },

  storyDescriptionTypography: {
    color:     theme.palette.common.white,
    fontSize:  14,
    fontStyle: "italic",
    textAlign: "center",
  },

  cardActions: {
    justifyContent: "flex-end",
  },

  storyCategory: {
    fontSize: 13,
  }

}));

interface Props {
  story: StoryModel;
  onEditStoryClick: (story: StoryModel) => void;
}

const Story = (props: Props) => {
  const { story, onEditStoryClick } = props;

  const onStoryEditionClick = () => onEditStoryClick(story);

  const classes = useStyles({
    backgroundImage: story.imageUrl,
  });
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="h4" className={classes.storyTitle}>{story.name}</Typography>
          <Typography className={classes.storyCategory}>Catégorie: {story.category}</Typography>
        </CardContent>
        <Divider />
        <CardContent className={classes.image}>
          <div className={classes.storyDescription}></div>
          <div className={classes.storyDescriptionText}>
            <Typography className={classes.storyDescriptionTypography}>
              {story.description}
            </Typography>
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.cardActions}>
          <IconBtn onClick={onStoryEditionClick} color="primary">
            <Tooltip title="Editer les détails de l'histoire">
              <Icon>
                edit
              </Icon>
            </Tooltip>
          </IconBtn>
          <Link to={AppRoute.EditConversation(story.id)}>
            <IconBtn color="primary">
              <Tooltip title="Editer la conversation">
                <Icon>
                  chat
                </Icon>
              </Tooltip>
            </IconBtn>
          </Link>

        </CardActions>
      </Card>
    </div>
  );
};

export default Story;
