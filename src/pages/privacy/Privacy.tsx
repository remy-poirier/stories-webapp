import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    marginTop:    theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight:   theme.typography.fontWeightBold,
  },
}));

const Privacy = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">
        Engagement de confidentialité
      </Typography>
      <Typography>
        La protection de votre vie privée est importante pour Thrilled. C'est pourquoi nous avons
        mis en place un Engament de Confidentialité afin de définir la manière dont nous recueillons, utilisons,
        divulguons et stockons vos données personnelles. Nous vous invitons à les lire afin de prendre connaissance
        de notre politique en matière de protection des données et de nous contacter si vous avez des questions.
      </Typography>
      <Typography variant="h6" className={classes.sectionTitle}>
        Collecte et utilisation des données à caractères personnel
      </Typography>
      <Typography>
        Les données suivantes sont collectées:
        <ul>
          <li>Adresse électronique</li>
        </ul>
        Ces données sont collectés lors de votre inscription sur notre application. Ces données ne sont en aucun
        cas transmises à des tiers. Enfin, nous n'utilisons pas de cookies pour réunir des informations vous concernant.
      </Typography>
      <Typography variant="h6" className={classes.sectionTitle}>
        Formulaire et interactivité
      </Typography>
      <Typography>
        Vos renseignements personnels sont collectés par le biais de formulaire, à savoir:
        <ul>
          <li>Formulaire d'inscription au site web</li>
        </ul>
        Ces renseignements sont ensuite utilisés afin de vous identifier à notre application, également
        afin que vous puissiez poster des commentaires sur notre application.
        <br />
        Egalement, nous devons vous authentifier sur l'application afin que vous puissiez ajouter du contenu à notre base
        de données, et cette authentification se fait par le biais de votre adresse e-mail.
      </Typography>
      <Typography variant="h6" className={classes.sectionTitle}>
        Collecte et utilisation des données à caractère non-personnel
      </Typography>
      <Typography>
        Des données à caractères non-personnel sont également collectées. Ces dernières ne nous permettent pas de faire
        un rapprochement direct avec vous). Nous pouvons collecter, utiliser, transférer et divulguer des données
        non-personnelles à quelque fins que ce soit.
        <br />
        Nous pouvons par exemple collecter votre langue, votre nom d'utilisateur, l'identifiant unique de votre appareil.
      </Typography>
    </div>
  );
};

export default Privacy;
