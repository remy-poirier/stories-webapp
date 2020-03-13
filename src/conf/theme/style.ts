import { computeMuiTheme } from 'conf/theme/muiTheme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeModes } from "models/Theme";

export const appTheme = (mode: ThemeModes) => createMuiTheme(computeMuiTheme(mode));
