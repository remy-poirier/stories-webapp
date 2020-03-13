import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    marginTop:    theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight:   theme.typography.fontWeightBold,
  },

  subSectionTitle: {
    marginTop:    theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight:   theme.typography.fontWeightBold,
    fontSize:     14,
  },

}));


const AppGuide = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">
        Guide d'utilisation de l'application mobile
      </Typography>
      <Typography>
        Ce guide présentera les divers écrans importants de l'application ainsi que certaines fonctionnalités
        disponibles dans les mises à jour à venir.
      </Typography>

      <Typography className={classes.sectionTitle}>
        Présentation des écrans importants
      </Typography>

      <Typography className={classes.subSectionTitle}>
        Ecran d'accueil
      </Typography>

      <Typography>
        Cet écran présente les histoires disponibles sous forme de liste, il vous suffit de cliquer sur le bouton
        pour accéder à la conversation. <br /> Vous pouvez également consulter les détails de l'histoire tel que
        son titre, sa catégorie, son image d'illustration, son auteur et enfin, sa description.
      </Typography>

      <Typography className={classes.subSectionTitle}>
        Ecran d'une conversation
      </Typography>

      <Typography>
        Cet écran est sans doute le plus important de l'application, c'est l'écran ou vous pouvez lire la conversation
        de l'histoire qui vous intéresse. Sur cet écran, tout a été pensé pour que l'expérience utilisateur soit la
        meilleure possible: vous n'avez qu'à cliquer sur l'écran pour passer au message suivant, pas besoin de défiler dans
        l'application, cette dernière le fera pour vous.
      </Typography>

      <Typography className={classes.sectionTitle}>
        Fonctionnalités à venir
      </Typography>

      <ul>
        <li>Connexion/Inscription</li>
        <li>Possibilité de liker ou disliker une histiore</li>
        <li>Possibilité de mettre une histoire en favori pour la retrouver plus facilement</li>
        <li>Ajout d'un filtre sur l'écran d'accueil pour choisir les histoires à afficher</li>
      </ul>
    </div>
  );
};

export default AppGuide;
