import React from 'react';
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  howTo: {
    marginTop: theme.spacing(2),
  },

  betaAlert: {
    marginBottom: theme.spacing(2),
  },

}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Alert severity="warning" className={classes.betaAlert}>
        <AlertTitle>Information importante</AlertTitle>
        Le site est encore en phase de bêta, ainsi toutes les fonctionnalités ne sont pas encore disponibles.
      </Alert>

      <Typography variant="h5" color="primary">
        Bienvenue sur l'application Web de Thrilled
      </Typography>
      <Typography>
        Ce site web va vous permettre de créer et éditer vos histoires qui seront disponibles
        sur l'application Thrilled.
      </Typography>
      <Typography className={classes.howTo}>
        Comment ajouter une histoire ?
      </Typography>
      <Typography>
        <ul>
          <li>Connectez-vous ou créez un compte sur le site via le lien disponible dans le menu</li>
          <li>Cliquez sur le lien "Mes histoires"</li>
          <li>A partir de là, vous pouvez soit ajouter ou éditer vos histoires via les liens disponibles sur la fiche de l'histoire</li>
          <li>Lorsque vous éditez une conversation, les modifications seront automatiquement sauvegardées</li>
        </ul>
      </Typography>
    </div>
  );
};

export default Home;
